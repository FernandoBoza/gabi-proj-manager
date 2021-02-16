import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { User, UserDocument } from '../users/users.schema';
import UserType from '../users/users.interface';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

console.clear();

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  // public async login({ email, password }): Promise<UserDocument | string> {
  public async login({ email, password }) {
    try {
      const res = await this.userModel.findOne({ email });
      return res && (await bcrypt.compare(password, res.password))
        ? this.getToken(email, res._id).then((result) => result)
        : 'Nah Bro, wrong password 🤡';
    } catch (err) {
      console.error(err);
    }
  }

  public async getToken(email, sub) {
    return {
      access_token: await this.jwtService.signAsync({ email, sub: sub }),
    };
  }

  // public async login({ email, password }): Promise<UserDocument | string> {
  public async register(user: UserType) {
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
