import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import User from './users.interface';
import { Observable, of } from 'rxjs';

@Controller('users')
export class UsersController {
  constructor(private us: UsersService) {}

  @Get('find/:email')
  findUserByEmail(@Param() params): Observable<User> {
    return of(this.us.findUserByEmail(params.email));
  }
}
