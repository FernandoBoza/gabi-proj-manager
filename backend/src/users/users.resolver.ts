import { Args, Query, Resolver } from '@nestjs/graphql';
import User from './users.model';
import { UsersService } from './users.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/auth.guard';

@Resolver((of) => User)
export class UsersResolver {
  constructor(private us: UsersService) {}

  /* FINDUSERBYEMAIL: Gets a user by email
   *
   * @Params(email => User)
   *
   * */
  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  async findUserByEmail(@Args('email') email: string) {
    return await this.us.findUserByEmail(email);
  }

  /* FINDALLUSERS: Gets all users
   *
   * @Params()
   *
   * */
  @Query(() => [User])
  @UseGuards(GqlAuthGuard)
  async findAllUsers() {
    return await this.us.findAllUsers();
  }
}
