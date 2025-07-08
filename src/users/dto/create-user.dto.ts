import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'John',
    description: "User's first name | Required",
  })
  @IsString({ message: 'First name type must be string.' })
  @IsNotEmpty({ message: 'First name must be entered.' })
  first_name: string;
  @ApiProperty({
    example: 'Doe',
    description: "User's last name | Optional.",
  })
  @IsString({ message: 'Last name type must be string.' })
  last_name?: string;
  @ApiProperty({
    example: 'john_doe',
    description: "User's unique username | Optional in creation phease.",
  })
  @IsString({ message: 'Username type must be string.' })
  username?: string;
  @ApiProperty({
    example: 'johndoe@example.com',
    description: "User's email | Required.",
  })
  @IsEmail({}, { message: 'Invalid email format!' })
  email: string;
  @ApiProperty({
    example: '...',
    description: "User's strong and hashshed password | Required.",
  })
  @IsStrongPassword({}, { message: 'Password not strong enough.' })
  hashshed_password: string;
  @ApiProperty({
    example: '...',
    description: "User's confirm password | Required.",
  })
  @IsString({ message: 'Confirm password type must be string.' })
  confirm_password: string;
  @ApiProperty({
    example: '/assets/joh_doe_img',
    description: "User's profil_image | Optional.",
  })
  @IsString({ message: 'Profile image path type must be string.' })
  profil_image?: string;
  @ApiProperty({
    example: 'GMT+5',
    description: "User's address's time zone | Optional.",
  })
  @IsString({ message: 'Time zone type must be string.' })
  time_zone?: string;
}
