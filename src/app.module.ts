import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import configuration from './config/environment';
import { ENV } from './config/environment.constant';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    DatabaseModule,
    UserModule,
    GraphQLModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        debug: configService.get<string>('env') !== ENV.PRODUCTION,
        playground: configService.get<string>('env') !== ENV.PRODUCTION,
        autoSchemaFile: 'schema.gql',
      }),
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}
