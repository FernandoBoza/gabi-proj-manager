import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../users/users.schema';
import UserType from '../users/users.interface';
import * as bcrypt from 'bcrypt';

console.clear();

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  public login({ email, password }) {
    try {
      const user = this.userModel.findOne({ email: email }).then((res) => {
        if (res && bcrypt.compareSync(password, res.password)) {
          return res;
        } else {
          return 'Nah Bro';
        }
      });
      // if (user == null && bcrypt.compareSync(password, user['password'])) {
      return user;
      // }
    } catch (err) {
      console.error(err);
    }
  }

  public register(user: UserType) {
    try {
      user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync());
      return new this.userModel(user).save();
    } catch (err) {
      console.error(err);
      return 'Email Already In Use';
    }
  }
}
