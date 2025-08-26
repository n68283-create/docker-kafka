import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from 'src/services/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
async createUser(@Body() body: any) {
  try {
    await this.usersService.createUser(body);
    return { status: 'User created & enqueued' };
  } catch (err) {
    throw new HttpException(
      { status: 'error', message: 'Failed to enqueue user', details: err.message },
      HttpStatus.SERVICE_UNAVAILABLE,
    );
  }
}
}
