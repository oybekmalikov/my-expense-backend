import { UpdateResult } from 'typeorm';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/entities/user.entity';

export type UserCreateReturnType = {
  message: string;
  user: CreateUserDto;
};
export type UserReadAllReturnType = {
  message: string;
  users: Array<User> | [];
};
export type UserReadOneReturnType = {
  message: string;
  user: User | [];
};
export type UserUpdateReturnType = {
  message: string;
  result: UpdateResult | [];
};
export type UserDeleteReturnType = {
  message: string;
  deleteCount: number | null | undefined;
  deletedUserId: number;
};
export type UserRoleType = 'user' | 'admin';
export type UserSignUpType = {
  message: string;
  id: number;
};
