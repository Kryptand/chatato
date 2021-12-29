import { Injectable } from '@nestjs/common';
import {
  AbstractImageProcessorService,
  Sizes,
} from '@chatato/image-processing';

@Injectable()
export class AvatarImageProcessorService {
  constructor(private imageProcessor: AbstractImageProcessorService) {}
  async processImages(image) {
    const buffer = image;
    const smallImage = await this.imageProcessor.createImageAtSize(
      buffer,
      Sizes.SMALL
    );
    const largeImage = await this.imageProcessor.createImageAtSize(
      buffer,
      Sizes.LARGE
    );
    return { smallImage, largeImage };
  }
}
