import {
  Args,
  Field,
  Mutation,
  Query,
  ObjectType,
  Resolver,
} from '@nestjs/graphql';
import { AuthService } from './auth.service';
import User, { InputUser, UpdateUserInput } from '../users/users.model';
import { UserDocument } from '../users/users.schema';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './auth.guard';
import { CurrentUser } from './auth.decorator';

@ObjectType()
export class Token {
  @Field()
  bearer: string;
}

@Resolver()
export class AuthResolver {
  constructor(private as: AuthService) {}

  @Mutation(() => User)
  async register(
    @Args('userInput') userInput: InputUser,
  ): Promise<UserDocument | string> {
    return await this.as.register(userInput);
  }

  @Mutation(() => Token)
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
  ): Promise<Token> {
    return { bearer: await this.as.login({ email, password }) };
  }

  @Query(() => User, { name: 'whoAmI' })
  @UseGuards(GqlAuthGuard)
  async whoAmI(@CurrentUser() user: User): Promise<UserDocument | string> {
    return await this.as.findUserByEmail(user.email);
  }

  @Mutation(() => User)
  @UseGuards(GqlAuthGuard)
  async updatePassword(
    @CurrentUser() user: User,
    @Args('password') password: string,
    @Args('newPassword') newPassword: string,
  ): Promise<UserDocument | void> {
    return await this.as.updatePassword(user.email, password, newPassword);
  }

  @Mutation(() => User)
  @UseGuards(GqlAuthGuard)
  async updateUser(
    @CurrentUser() user: User,
    @Args('userInput') userInput: UpdateUserInput,
  ): Promise<UserDocument | void> {
    return await this.as.updateUser(user._id, userInput);
  }
}
