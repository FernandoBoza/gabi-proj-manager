import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import User from './users.model';
import { UsersService } from './users.service';

console.clear();

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
