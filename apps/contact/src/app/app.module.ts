import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { RedisCachingModule } from '@kryptand/redis-caching';
import { ConfigModule } from '@nestjs/config';
import { Contact } from './contact.entity';
import { TypeormPostgresModule } from '@kryptand/typeorm-extensions';
import { ContactModule } from './contact.module';
import {
  ActivityMiddleware,
  ActivityProducerModule,
} from '@chatato/activity-producer';

const SERVICE_IDENTIFIER = 'CONTACT';

@Module({
  imports: [
    ActivityProducerModule,
    ConfigModule.forRoot({
      envFilePath: 'environment/.env',
      isGlobal: true,
      cache: true,
    }),
    TypeormPostgresModule.forRoot(SERVICE_IDENTIFIER, [Contact]),
    RedisCachingModule.forRoot(SERVICE_IDENTIFIER),
    ContactModule,
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
