import { Module } from '@nestjs/common';
import { AvatarModule } from './avatar.module';
import { ConfigModule } from '@nestjs/config';
import { TypeormPostgresModule } from '@kryptand/typeorm-extensions';
import { RedisCachingModule } from '@kryptand/redis-caching';
import { Avatar } from './avatar.entity';
const AVATAR_SERVICE_IDENTIFIER = 'USER_AVATAR';
@Module({
  imports: [
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
export class AppModule {}
