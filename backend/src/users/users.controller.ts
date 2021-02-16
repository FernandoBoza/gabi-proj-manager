import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import User from './users.model';
import { from, Observable } from 'rxjs';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/roles/roles.decorator';
import { Role } from '../auth/roles/roles.enum';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private us: UsersService) {}

  @Get('find/:email')
  @Roles(Role.Admin)
  findUserByEmail(@Param() params): Observable<User | string> {
    return from(this.us.findUserByEmail(params.email));
  }
}
