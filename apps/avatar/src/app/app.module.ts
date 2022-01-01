import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AvatarModule } from './avatar.module';
import { ConfigModule } from '@nestjs/config';
import { TypeormPostgresModule } from '@kryptand/typeorm-extensions';
import { RedisCachingModule } from '@kryptand/redis-caching';
import { Avatar } from './avatar.entity';
import {
  ActivityMiddleware,
  ActivityProducerModule,
} from '@chatato/activity-producer';
const AVATAR_SERVICE_IDENTIFIER = 'USER_AVATAR';
@Module({
  imports: [
    ActivityProducerModule,
    ConfigModule.forRoot({
      envFilePath: 'environment/.env',
      isGlobal: true,
      cache: true,
    }),
    TypeormPostgresModule.forRoot(AVATAR_SERVICE_IDENTIFIER, [Avatar]),
    RedisCachingModule.forRoot(AVATAR_SERVICE_IDENTIFIER),
    AvatarModule,
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
