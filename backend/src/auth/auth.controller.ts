import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import User from '../users/users.interface';
import { UserDocument } from '../users/users.schema';
import { Observable, of, from } from 'rxjs';

@Controller('auth')
export class AuthController {
  constructor(private as: AuthService) {}

  //TODO: REVERT BACK TO OBSERVABLE
  // Observable<UserDocument | string>
  // return from()
  @Post('login')
  login(@Body() req: User) {
    return this.as.login(req);
  }

  @Post('register')
  register(@Body() req: User): Observable<UserDocument | string> {
    return from(this.as.register(req));
  }
}
