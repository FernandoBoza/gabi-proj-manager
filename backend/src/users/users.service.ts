import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User, UserDocument } from './users.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  public async findUserByEmail(email: string) {
    try {
      const User = await this.userModel.findOne({ email });
      return User ? User : 'Nah bro, no account 🤡';
    } catch (err) {
      console.error(err);
    }
  }
}
