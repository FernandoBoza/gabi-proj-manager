import { Args, Query, Resolver } from '@nestjs/graphql';
import User from './users.model';
import { UsersService } from './users.service';

@Resolver((of) => User)
export class UsersResolver {
  constructor(private us: UsersService) {}

  @Query(() => User)
  async findUserByEmail(@Args('email') email: string) {
    return await this.us.findUserByEmail(email);
  }

  @Query(() => [User])
  async findAllUsers() {
    return await this.us.findAllUsers();
  }
}
