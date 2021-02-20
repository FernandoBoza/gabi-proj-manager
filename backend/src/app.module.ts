import { Injectable, Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import {
  MongooseModule,
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';
import {
  GqlModuleOptions,
  GqlOptionsFactory,
  GraphQLModule,
} from '@nestjs/graphql';
import { ProjectsModule } from './projects/projects.module';
import { TasksModule } from './tasks/tasks.module';
import { CommentsModule } from './comments/comments.module';

@Injectable()
class MongoOptions implements MongooseOptionsFactory {
  createMongooseOptions(): MongooseModuleOptions {
    return {
      uri: 'mongodb://localhost:27017/nest',
    };
  }
}

@Injectable()
class GraphQLOptions implements GqlOptionsFactory {
  createGqlOptions(): Promise<GqlModuleOptions> | GqlModuleOptions {
    return {
      playground: true,
      debug: false,
      autoSchemaFile: true,
      context: ({ request }) => ({ request }),
    };
  }
}

@Module({
  imports: [
    AuthModule,
    UsersModule,
    GraphQLModule.forRootAsync({
      useClass: GraphQLOptions,
    }),
    MongooseModule.forRootAsync({
      useClass: MongoOptions,
    }),
    ProjectsModule,
    TasksModule,
    CommentsModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
