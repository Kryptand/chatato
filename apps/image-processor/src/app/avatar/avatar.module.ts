import { Module } from '@nestjs/common';
import { AvatarImageProcessorService } from './avatar-image-processor.service';
import { ImageProcessingModule } from '@chatato/image-processing';
import { ProcessorController } from './processor.controller';
import { FileManagementModule } from '@kryptand/file-management';
@Module({
  imports: [
    ImageProcessingModule,
    FileManagementModule.forFeature('USER_AVATAR'),
  ],
  providers: [AvatarImageProcessorService],
  controllers: [ProcessorController],
})
export class AvatarModule {}
