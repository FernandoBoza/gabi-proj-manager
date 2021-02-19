import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { User, UserDocument } from '../users/users.schema';
import UserType from '../users/users.model';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  public async login({ email, password }): Promise<string> {
    try {
      const res = await this.userModel.findOne({ email });
      return res && (await bcrypt.compare(password, res.password))
        ? this.getToken(email, res._id).then((result) => result)
        : 'Nah Bro, wrong password 🤡';
    } catch (err) {
      console.error(err);
    }
  }

  public async getToken(email, sub): Promise<string> {
    try {
      return await this.jwtService.signAsync({ email, sub: sub });
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

  public async updatePassword(userEmail, userPass, newPass) {
    try {
      const User = await this.userModel.findOne({ email: userEmail });
      if (await bcrypt.compare(userPass, User.password)) {
        User.password = await bcrypt.hash(newPass, 10);
        return await new this.userModel(User).save();
      }
    } catch (err) {
      console.error(err);
    }
  }

  public async updateUser(userId, newUser) {
    try {
      return await this.userModel.findByIdAndUpdate({ _id: userId }, newUser, {
        new: true,
      });
    } catch (err) {
      console.error(err);
    }
  }

  public async findUserByEmail(email: string): Promise<UserDocument | string> {
    try {
      const User = await this.userModel.findOne({ email });
      return (await User) ? User : 'Nah bro, no account 🤡';
    } catch (err) {
      console.error(err);
    }
  }
}
