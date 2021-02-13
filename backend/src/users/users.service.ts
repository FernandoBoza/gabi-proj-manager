import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  public findUserByEmail(email: string) {
    return {
      email: 'hifer',
      password: 'password',
      firstName: 'Fer',
      lastName: 'Boza',
    };
  }
}
