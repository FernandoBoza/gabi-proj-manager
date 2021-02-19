import {
  Args,
  Field,
  Mutation,
  Query,
  ObjectType,
  Resolver,
  GqlExecutionContext,
} from '@nestjs/graphql';
import { AuthService } from './auth.service';
import User, { InputUser } from '../users/users.model';
import { UserDocument } from '../users/users.schema';
import {
  UseGuards,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import { GqlAuthGuard } from './auth.guard';

@ObjectType()
export class Token {
  @Field()
  bearer: string;
}

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    return GqlExecutionContext.create(context).getContext().req.user;
  },
);

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
    return this.as.findUserByEmail(user.email);
  }

  @Mutation(() => User)
  async updatePassword(
    @Args('email') email: string,
    @Args('password') password: string,
    @Args('newPassword') newPassword: string,
  ): Promise<UserDocument | void> {
    return await this.as.updatePassword(email, password, newPassword);
  }
}
