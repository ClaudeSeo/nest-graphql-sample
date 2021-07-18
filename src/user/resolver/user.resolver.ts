import { Args, Query, Resolver } from '@nestjs/graphql';
import { User } from '../model/user.model';
import { UserService } from '../service/user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User)
  async user(@Args('_id') _id: string): Promise<User> {
    return this.userService.findById(_id);
  }
}
