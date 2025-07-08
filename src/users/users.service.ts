import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { MailService } from '../mail/mail.service';
import {
  UserCreateReturnType,
  UserDeleteReturnType,
  UserReadAllReturnType,
  UserReadOneReturnType,
  UserUpdateReturnType,
} from '../types';
import { ChangeUserEmailDto } from './dto/change-user-email.dto';
import { ChangeUserPasswordDto } from './dto/change-user-password.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly mailService: MailService,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<UserCreateReturnType> {
    const { email, hashshed_password, confirm_password } = createUserDto;
    const emailCheck = await this.userRepo.findOneBy({ email });
    if (emailCheck) {
      throw new ConflictException(`${email} already exists.`);
    }
    if (hashshed_password !== confirm_password) {
      throw new BadRequestException(
        'Password and confirm password not matched!',
      );
    }
    const hashshedPassword = await bcrypt.hash(hashshed_password, 7);
    const newUser = await this.userRepo.save({
      ...createUserDto,
      hashshed_password: hashshedPassword,
    });
    try {
      await this.mailService.sendMail(newUser);
    } catch (error) {
      console.log(error);
      throw new ServiceUnavailableException({
        message: 'Error on sending activation link to email',
      });
    }
    return {
      message:
        'Confirmation link has been sent to email & User create successfully!',
      user: newUser,
    };
  }

  async findAll(): Promise<UserReadAllReturnType> {
    const allUser = await this.userRepo.find();
    if (!allUser.length) {
      return {
        message: 'No user found. ',
        users: [],
      };
    }
    return {
      message: 'All users selected',
      users: allUser,
    };
  }

  async findOne(id: number): Promise<UserReadOneReturnType> {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not exists.');
    }
    return {
      message: 'User selected',
      user,
    };
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UserUpdateReturnType> {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not exists.');
    }
    if (updateUserDto.hashshed_password) {
      throw new BadRequestException(
        'Password cannot be changed at this address.',
      );
    }
    if (updateUserDto.email) {
      throw new BadRequestException('Email cannot be changed at this address.');
    }
    const updateUser = await this.userRepo.update(id, updateUserDto);
    return {
      message: 'User updated successfully.',
      result: updateUser,
    };
  }

  async remove(id: number): Promise<UserDeleteReturnType> {
    const isUserExists = await this.userRepo.findOneBy({ id });
    if (!isUserExists) {
      throw new NotFoundException('User not exists.');
    }
    const res = await this.userRepo.delete({ id });
    return {
      message: 'User deleted successfully.',
      deleteCount: res.affected,
      deletedUserId: id,
    };
  }
  async changeUserPassword(
    id: number,
    changeUserPasswordDto: ChangeUserPasswordDto,
  ) {
    const { newPassword, confirmPassword } = changeUserPasswordDto;
    if (newPassword !== confirmPassword) {
      throw new BadRequestException(
        'Password and confirm password not matched',
      );
    }
    const newHashshedPassword = await bcrypt.hash(newPassword, 7);
    await this.userRepo.update(id, {
      hashshed_password: newHashshedPassword,
    });
    return { message: 'Password changed successfully' };
  }
  async changeUserEmail(id: number, changeUserEmailDto: ChangeUserEmailDto) {
    await this.userRepo.update(id, {
      email: changeUserEmailDto.newEmail,
    });
    return { message: 'Email changed successfully' };
  }
  async getAllUserForSearch() {
    const allUser = await this.userRepo.find();
    if (!allUser.length) {
      return {
        message: 'No user found. ',
        users: [],
      };
    }
    const returnedArray: any = [];
    for (const user of allUser) {
      returnedArray.push({
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        username: user.username,
      });
    }
    return {
      message: 'All users selected',
      users: returnedArray,
    };
  }
  async sendConfirmationToEmail(id: number) {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not exists.');
    }
    try {
      await this.mailService.sendMail(user);
    } catch (error) {
      console.log(error);
      throw new ServiceUnavailableException({
        message: 'Error on sending activation link to email',
      });
    }
    return {
      message: 'Conirmation successfully sent to email!',
      userId: id,
    };
  }
}
