import { Args, Field, Mutation, ObjectType, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import User, { InputUser } from '../users/users.model';
import { UserDocument } from '../users/users.schema';

@ObjectType()
export class Token {
  @Field()
  bearer: string;
}

@Resolver()
export class AuthResolver {
  constructor(private as: AuthService) {}

  /* Register: CREATE User
   *
   * @Params(User => fistName, lastName, email, password, confPass)
   *
   * */
  @Mutation(() => User)
  async register(
    @Args('userInput') userInput: InputUser,
  ): Promise<UserDocument | string> {
    return await this.as.register(userInput);
  }

  /* Login: VALIDATES & JWT Token
   *
   * @Params(email, password =>  email, password )
   *
   * */
  @Mutation(() => Token)
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
  ): Promise<Token> {
    return { bearer: await this.as.login({ email, password }) };
  }

  /* Register: UPDATES User
   *
   * @Params(User => fistName, lastName, email, password, confPass)
   *
   * */
  @Mutation(() => User)
  async updatePassword(
    @Args('email') email: string,
    @Args('password') password: string,
    @Args('newPassword') newPassword: string,
  ): Promise<UserDocument | void> {
    return await this.as.updatePassword(email, password, newPassword);
  }
}
