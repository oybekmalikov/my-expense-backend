import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as uuid from 'uuid';
import { type UserRoleType } from '../../types';
@Entity({ name: 'users' })
export class User {
  @ApiProperty({
    example: 1,
    description: "User's unique id.",
  })
  @PrimaryGeneratedColumn()
  id: number;
  @ApiProperty({
    example: 'John',
    description: "User's first name.",
  })
  @Column({ length: 50 })
  first_name: string;
  @ApiProperty({
    example: 'Doe',
    description: "User's last name.",
  })
  @Column({ length: 50 })
  last_name: string;
  @ApiProperty({
    example: 'john_doe',
    description: "User's unique username.",
  })
  @Column({ length: 50 })
  username: string;
  @ApiProperty({
    example: 'johndoe@example.com',
    description: "User's email.",
  })
  @Column({ length: 100 })
  email: string;
  @ApiProperty({
    example: '...',
    description: "User's strong and hashshed password.",
  })
  @Column({ length: 255 })
  hashshed_password: string;
  @ApiProperty({
    example: '/assets/joh_doe_img',
    description: "User's profil_image.",
  })
  @Column({ length: 255 })
  profil_image: string;
  @ApiProperty({
    example: true,
    description: 'User is active or not?',
  })
  @Column({ default: false })
  is_active: boolean;
  @ApiProperty({
    example: true,
    description: 'Is user verified by activation link or with otp code?',
  })
  @Column({ default: false })
  is_verified: boolean;
  @ApiProperty({
    example: 'GMT+5',
    description: "User's address's time zone.",
  })
  @Column({ length: 100 })
  time_zone: string;
  @ApiProperty({
    example: 'user',
    description: "User's role.",
  })
  @Column({ length: 10, default: 'user' })
  role: UserRoleType;
  @ApiProperty({
    example: '54wt%ee4-645$42155eger',
    description:
      'This uniqe link used for activation link or user;s profil photos path.',
  })
  @Column({ default: uuid.v4() })
  unique_link: string;
  @ApiProperty({
    example: '...',
    description: "User's refresh token.",
  })
  @Column({ default: '' })
  hashshed_refresh_token: string;
}
