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

  public async login({ email, password }): Promise<UserDocument | string> {
    try {
      const res = await this.userModel.findOne({ email });
      return res && (await bcrypt.compare(password, res.password))
        ? res
        : 'Nah Bro, wrong password 🤡';
    } catch (err) {
      console.error(err);
    }
  }

  public async register(user: UserType): Promise<UserDocument | string> {
    try {
      const isUser = await this.userModel.findOne({ email: user.email });
      if (isUser) {
        return 'Nah Bro, you already exist 🤡';
      } else {
        user.password = await bcrypt.hash(user.password, 10).then((r) => r);
        return new this.userModel(user).save();
      }
    } catch (err) {
      console.error(err);
    }
  }
}
