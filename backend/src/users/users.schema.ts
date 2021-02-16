import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import UserModel from './users.model';
import { Document } from 'mongoose';

@Schema()
export class User extends UserModel {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  imageURL: string;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
