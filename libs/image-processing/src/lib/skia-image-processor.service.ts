import { Injectable } from '@nestjs/common';
import * as sharp from 'sharp';
import { AbstractImageProcessorService } from './abstract-image-processor.service';
import { Sizes } from './sizes';
import { Buffer } from 'buffer';

@Injectable()
export class SkiaImageProcessorService extends AbstractImageProcessorService {
  async resizeImage(image: any, width: number, height?: number) {
    console.debug('Resizing image', image);
    return await sharp(image).resize({
      width: width,
      height: height,
    });
  }
  async createImageAtSize(image, size: Sizes) {
    return await this.resizeImage(image, size);
  }
}
