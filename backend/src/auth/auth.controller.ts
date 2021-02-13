import { Controller, Request, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Observable, of } from 'rxjs';
import User from '../users/users.interface';

@Controller('auth')
export class AuthController {
  constructor(private as: AuthService) {}

  @Post('login')
  login(@Body() req: User): Observable<any> {
    return of(this.as.login(req));
  }

  @Post('register')
  register(@Body() req: User): Observable<any> {
    return of(this.as.register(req));
  }
}
