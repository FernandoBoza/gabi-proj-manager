import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import UserInterface from './users.interface';

export type UserDocument = UserInterface & Document;

@Schema()
export class User implements UserInterface {
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

export const UserSchema = SchemaFactory.createForClass(User);
