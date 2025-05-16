import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAllUsers() {
    return this.usersService.findAllUsers();
  }

  @Post()
  createUser(@Body() user: Partial<User>) {
    return this.usersService.createUser(user);
  }
}
