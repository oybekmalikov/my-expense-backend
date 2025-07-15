import { ApiProperty } from '@nestjs/swagger'
import { IsEmail } from 'class-validator'

export class UserSignInDto{
	@ApiProperty({
		example: "user@example.com",
		description: "User's unique email",
	})
	@IsEmail({}, { message: "Invalid email" })
	email: string;
	@ApiProperty({
		example: "...",
		description: "User's strong password",
	})
	password: string;
}