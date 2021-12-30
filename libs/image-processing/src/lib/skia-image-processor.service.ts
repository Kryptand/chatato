import { Injectable } from '@nestjs/common';
import * as sharp from 'sharp';
import { AbstractImageProcessorService } from './abstract-image-processor.service';
import { Sizes } from './sizes';

@Injectable()
export class SkiaImageProcessorService extends AbstractImageProcessorService {
  async resizeImage(image: any, width: number, height?: number) {
    return await sharp(Buffer.from(image.buffer)).resize({
      width: width,
      height: height,
    });
  }
  async createImageAtSize(image, size: Sizes) {
    return await this.resizeImage(image, size);
  }
}
