import { Module } from '@nestjs/common';
import { SkiaImageProcessorService } from './skia-image-processor.service';
import { AbstractImageProcessorService } from './abstract-image-processor.service';

@Module({
  providers: [
    {
      provide: AbstractImageProcessorService,
      useClass: SkiaImageProcessorService,
    },
    SkiaImageProcessorService,
  ],
  exports: [AbstractImageProcessorService, SkiaImageProcessorService],
})
export class ImageProcessingModule {}
