import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../users/users.schema';
import UserType from '../users/users.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel) {
    console.clear();
  }

  private genPassword = async (password: string): Promise<string> => {
    return bcrypt.hash(password, bcrypt.genSaltSync());
  };

  private isMatch = async (password, hash) => {
    return await bcrypt.compare(password, hash);
  };

  public login({ email, password }): UserType {
    try {
      const user = this.userModel.find({ email: email });
      if (user) {
        return user
          .then((user) => user[0].password)
          .then((hashPass) => this.isMatch(password, hashPass))
          .then((isMatch) => (isMatch ? user : 'wrong credentials'));
      }
    } catch (err) {
      console.error(err);
    }
  }

  public register(user: UserType): UserType | string {
    const hashPass = this.genPassword(user.password);
    try {
      hashPass.then((pass) => {
        user.password = pass;
        return new this.userModel(user).save();
      });
    } catch (err) {
      console.error(err);
      return 'Email already exist';
    }
  }
}
