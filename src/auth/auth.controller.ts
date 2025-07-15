import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { CookieGetter } from '../common/decorators/cookie-getter.decorator';
import { AuthGuard } from '../common/Guards/auth.guard';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { UserSignInDto } from './dto/user-sign-in.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @ApiOperation({ summary: 'Sign Up for admins and users' })
  @ApiResponse({
    status: 200,
    description: "Return message and user's data",
    type: Object,
  })
  @HttpCode(200)
  @Post('sign-up')
  async signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  @ApiOperation({ summary: 'Sign In for admins and users' })
  @ApiResponse({
    status: 200,
    description: 'Return welcome message and access token',
    type: Object,
  })
  @HttpCode(200)
  @Post('sign-in')
  async signIn(
    @Body() userSignInDto: UserSignInDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.signIn(userSignInDto, res);
  }

  @ApiOperation({ summary: 'Sign Out for admins and users' })
  @ApiResponse({
    status: 200,
    description: 'Return logout message',
    type: Object,
  })
  @HttpCode(200)
  @UseGuards(AuthGuard)
  @Get('sign-out')
  signOut(
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.signOut(refreshToken, res);
  }

  @ApiOperation({ summary: 'Update refresh token for admins and users' })
  @ApiResponse({
    status: 200,
    description: 'Return message, user id and new access token',
    type: Object,
  })
  @UseGuards(AuthGuard)
  @HttpCode(200)
  @Get('refresh-token/:id')
  async updateRefreshToken(
    @Res({ passthrough: true }) res: Response,
    @CookieGetter('refresh_token') refresh_token: string,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.authService.updateRefreshToken(id, refresh_token, res);
  }
}
