import { Injectable, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import {
  MongooseModule,
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';

@Injectable()
class MongoOptions implements MongooseOptionsFactory {
  createMongooseOptions(): MongooseModuleOptions {
    return {
      uri: 'mongodb://localhost:27017/nest',
    };
  }
}

@Module({
  imports: [
    AuthModule,
    UsersModule,
    GraphQLModule.forRoot({
      playground: true,
      debug: false,
      autoSchemaFile: true,
    }),
    MongooseModule.forRootAsync({
      useClass: MongoOptions,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
