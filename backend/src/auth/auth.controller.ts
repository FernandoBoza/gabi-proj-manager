import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import User from '../users/users.interface';
import { UserDocument } from '../users/users.schema';
import { Observable, from } from 'rxjs';
import { LocalAuthGuard } from './guards/local.guard';

@Controller('auth')
export class AuthController {
  constructor(private as: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  // login(@Body() req: User): Observable<UserDocument | string> {
  login(@Body() req: User) {
    return from(this.as.login(req));
  }

  @Post('register')
  register(@Body() req: User): Observable<UserDocument | string> {
    return from(this.as.register(req));
  }
}
