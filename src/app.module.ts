import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { RestModule } from './rest/rest.module';
import { AppController } from './app.controller';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { GraphqlModule } from './graphql/graphql.module';

@Module({
  imports: [
    PrismaModule,
    RestModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      introspection: true,
      playground: true,
    }),
    GraphqlModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
