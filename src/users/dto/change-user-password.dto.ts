import { ApiProperty } from '@nestjs/swagger';
import { IsStrongPassword } from 'class-validator';

export class ChangeUserPasswordDto {
  @ApiProperty({
    example: '...',
    description: "User's strong and hashshed new password | Required.",
  })
  @IsStrongPassword({}, { message: 'Password not strong enough' })
  newPassword: string;
  @ApiProperty({
    example: '...',
    description: "User's confirm password | Required.",
  })
  confirmPassword: string;
}
