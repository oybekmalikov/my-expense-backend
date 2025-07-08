import { ApiProperty } from '@nestjs/swagger'
import { IsEmail } from 'class-validator';

export class ChangeUserEmailDto {
  @ApiProperty({
    example: 'johndoe@example.com',
    description: "User's new email | Required.",
  })
  @IsEmail({}, { message: 'Invalid email format.' })
  newEmail: string;
}
