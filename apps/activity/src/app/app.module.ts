import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeormPostgresModule } from '@kryptand/typeorm-extensions';
import { RedisCachingModule } from '@kryptand/redis-caching';
import { ActivityModule } from './activity/activity.module';
import { Activity } from './activity/activity.entity';
const ACTIVITY_SERVICE_IDENTIFIER = 'USER_ACTIVITY';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'environment/.env',
      isGlobal: true,
      cache: true,
    }),
    TypeormPostgresModule.forRoot(ACTIVITY_SERVICE_IDENTIFIER, [Activity]),
    RedisCachingModule.forRoot(ACTIVITY_SERVICE_IDENTIFIER),
    ActivityModule,
  ],
})
export class AppModule {}
