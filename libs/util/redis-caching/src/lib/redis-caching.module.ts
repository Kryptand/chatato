import { CacheInterceptor, CacheModule, Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Global()
@Module({})
export class RedisCachingModule {
  public static forRoot(identifier: string) {
    return {
      module: RedisCachingModule,
      providers: [
        {
          provide: APP_INTERCEPTOR,
          useClass: CacheInterceptor,
        },
      ],
      imports: [
        CacheModule.registerAsync({
          imports: [ConfigModule],
          useFactory: (config: ConfigService) => {
            return {
              store: redisStore,
              host: config.get(identifier) || 'localhost',
              port: config.get(identifier + '_REDIS_PORT'),
              ttl: 30,
              isGlobal: true,
            };
          },
          inject: [ConfigService],
        }),
      ],
    };
  }
}
