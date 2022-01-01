import {MiddlewareConsumer, Module, RequestMethod} from '@nestjs/common';
import { User } from './user/user.entity';
import { RedisCachingModule } from '@kryptand/redis-caching';
import { TypeormPostgresModule } from '@kryptand/typeorm-extensions';
import { ConfigModule } from '@nestjs/config';
import {UserModule} from "./user/user.module";
import {ActivityMiddleware, ActivityProducerModule} from "@chatato/activity-producer";

const USER_SERVICE_IDENTIFIER = 'USER_MANAGEMENT';
@Module({
  imports: [
    ActivityProducerModule,
    ConfigModule.forRoot({
      envFilePath: 'environment/.env',
      isGlobal: true,
      cache: true,
    }),
    TypeormPostgresModule.forRoot(USER_SERVICE_IDENTIFIER, [User]),
    RedisCachingModule.forRoot(USER_SERVICE_IDENTIFIER),
    UserModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ActivityMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
