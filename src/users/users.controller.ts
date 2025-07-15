import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ChangeUserEmailDto } from './dto/change-user-email.dto';
import { ChangeUserPasswordDto } from './dto/change-user-password.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @ApiOperation({ summary: 'Add new user (for admins)' })
  @ApiResponse({ status: 201, description: 'Create user', type: User })
  // @UseGuards(new AccessControlGuard({ users: ['admin'] }, 'users'))
  // @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'Return all users list',
    type: Array<User>,
  })
  // @UseGuards(new AccessControlGuard({ users: ['admin'] }, 'users'))
  // @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }
  @ApiOperation({ summary: 'Get user by id' })
  @ApiResponse({ status: 200, description: 'Return user', type: User })
  // @UseGuards(
  //   new AccessControlGuard({ users: ['admin','user'] }, 'users'),
  //   new SelfGuard('id', 'id'),
  // )
  // @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }
  @ApiOperation({ summary: 'Update user by id' })
  @ApiResponse({ status: 200, description: 'Updated user', type: User })
  // @UseGuards(
  //   new AccessControlGuard({ users: ['admin','user'] }, 'users'),
  //   new SelfGuard('id', 'id'),
  // )
  // @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }
  @ApiOperation({ summary: 'Delete user by id' })
  @ApiResponse({ status: 200, description: 'Deleted user', type: Object })
  //   @UseGuards(
  //     new AccessControlGuard({ users: ['admin'] }, 'users'),
  //     new SelfGuard('id', 'id'),
  //   )
  //   @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
  @ApiOperation({ summary: 'Change users password' })
  @ApiResponse({ status: 200, description: 'Status message', type: Object })
  //   @UseGuards(
  //     new AccessControlGuard({ users: ['user'] }, 'users'),
  //     new SelfGuard('id', 'id'),
  //   )
  //   @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('change-password/:id')
  changePassword(
    @Param('id') id: string,
    @Body() changeUserPassword: ChangeUserPasswordDto,
  ) {
    return this.usersService.changeUserPassword(+id, changeUserPassword);
  }
  @ApiOperation({ summary: 'Change users email' })
  @ApiResponse({ status: 200, description: 'Status message', type: Object })
  //   @UseGuards(
  //     new AccessControlGuard({ users: ['user'] }, 'users'),
  //     new SelfGuard('id', 'id'),
  //   )
  //   @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('change-email/:id')
  changeEmail(
    @Param('id') id: string,
    @Body() changeUserEmailDto: ChangeUserEmailDto,
  ) {
    return this.usersService.changeUserEmail(+id, changeUserEmailDto);
  }
  @ApiOperation({
    summary: 'Return only users id, first & last name and username',
  })
  @ApiResponse({ status: 200, description: 'Users list', type: Object })
  //   @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('search-users')
  getAllUserForSearch() {
    return this.usersService.getAllUserForSearch();
  }
  @ApiOperation({ summary: 'Send confirmation link to user by given id.' })
  @ApiResponse({
    status: 200,
    description: 'Status message and user id',
    type: Object,
  })
  //   @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('send-cofirmation/:id')
  sendConfirmationToEmail(@Param('id') id: string) {
    return this.usersService.sendConfirmationToEmail(+id);
  }
  @ApiOperation({ summary: "Activate User" })
	@ApiResponse({
		status: 200,
		description: "message, is_active?",
		type: Object,
	})
	@Get("activate/:link")
	activateUser(@Param("link") link: string) {
		return this.usersService.activation(link);
	}
}
