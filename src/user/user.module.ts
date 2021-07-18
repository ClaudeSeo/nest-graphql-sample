import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DATABASE_CONNECTION_NAME } from '~/config/environment.constant';
import { UserResolver } from './resolver/user.resolver';
import { User, UserSchema } from './schema/user.schema';
import { UserService } from './service/user.service';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: User.name,
          schema: UserSchema,
        },
      ],
      DATABASE_CONNECTION_NAME.MAIN
    ),
  ],
  providers: [UserResolver, UserService],
})
export class UserModule {}
