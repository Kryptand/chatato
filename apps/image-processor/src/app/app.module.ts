import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AvatarImageProcessorService } from './avatar/avatar-image-processor.service';
import { AvatarModule } from './avatar/avatar.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'environment/.env',
      isGlobal: true,
      cache: true,
    }),
AvatarModule
  ],
})
export class AppModule {}
