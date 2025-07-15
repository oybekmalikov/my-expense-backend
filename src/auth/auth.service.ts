import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { UserSignInDto } from './dto/user-sign-in.dto';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async generateTokens(user: User) {
    const payload = {
      id: user.id,
      isActive: user.is_active,
      roles: user.role == 'admin' ? ['admin', 'user'] : ['user'],
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }
  async signUp(createUserDto: CreateUserDto) {
    const response = await this.userService.create(createUserDto);
    return response;
  }
  async signIn(userSignInDto: UserSignInDto, res: Response) {
    const user = await this.userService.findByEmail(userSignInDto.email);
    if (!user) {
      throw new BadRequestException('Invalid email or password.');
    }
    if (!user.is_active) {
      throw new UnauthorizedException('Please, activate your account!');
    }
    const validPassword = await bcrypt.compare(
      userSignInDto.password,
      user.hashshed_password,
    );
    if (!validPassword) {
      throw new BadRequestException('Invalid email or password.');
    }
    const { accessToken, refreshToken } = await this.generateTokens(user);
    res.cookie('refresh_token', refreshToken, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true,
    });
    await this.userService.updateRefreshToken(user.id, refreshToken);
    return {
      message: 'Welcome!!!',
      accessToken,
    };
  }
  async updateRefreshToken(
    userId: number,
    refresh_token: string,
    res: Response,
  ) {
    const decodedRefreshToken = await this.jwtService.decode(refresh_token);
    if (userId !== decodedRefreshToken['id']) {
      throw new ForbiddenException('Not Allowed!');
    }
    const { user } = await this.userService.findOne(userId);
    if (!user || !user.hashshed_refresh_token) {
      throw new NotFoundException('User not found.');
    }
    const tokenMatch = await bcrypt.compare(
      refresh_token,
      user.hashshed_refresh_token,
    );
    if (!tokenMatch) {
      throw new ForbiddenException('Forbidden!');
    }
    const { accessToken, refreshToken } = await this.generateTokens(user);
    await this.userService.updateRefreshToken(userId, refreshToken);
    res.cookie('refresh_token', refreshToken, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true,
    });
    return {
      message: 'Refresh token updated',
      id: userId,
      accessToken,
    };
  }
  async signOut(refreshToken: string, res: Response) {
    const userData = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    if (!userData) {
      throw new ForbiddenException('User not verified!');
    }
    this.userService.updateRefreshToken(userData.id, null!);
    res.clearCookie('refresh_token');
    return {
      message: 'User logged out',
    };
  }
}
