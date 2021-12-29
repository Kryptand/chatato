import { Module } from '@nestjs/common';
import { RedisCachingModule } from '@kryptand/redis-caching';
import { ConfigModule } from '@nestjs/config';
import { Contact } from './contact.entity';
import { TypeormPostgresModule } from '@kryptand/typeorm-extensions';
import { ContactModule } from './contact.module';

const SERVICE_IDENTIFIER = 'CONTACT';

@Module({
  imports: [
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
export class AppModule {}
