import { Module } from '@nestjs/common';
import { AvatarImageProcessorService } from './avatar-image-processor.service';
import { ImageProcessingModule } from '@chatato/image-processing';
import { ProcessorController } from './processor.controller';
import { FileManagementModule } from '@kryptand/file-management';
import { AvatarPersistorService } from './avatar-persistor.service';
import { ProcessorService } from './processor.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
@Module({
  imports: [
    ImageProcessingModule,
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'image-processor',
            brokers: ['localhost:29092'],
          },
          consumer: {
            groupId: 'avatar-image-processor-group',
          },
        },
      },
    ]),
    FileManagementModule.forFeature('USER_AVATAR'),
  ],
  providers: [ProcessorService,AvatarImageProcessorService,AvatarPersistorService],
  controllers: [ProcessorController],
})
export class AvatarModule {}
