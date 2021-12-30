import { Injectable } from '@nestjs/common';
import {
  AbstractImageProcessorService,
  Sizes,
} from '@chatato/image-processing';

@Injectable()
export class AvatarImageProcessorService {
  constructor(private imageProcessor: AbstractImageProcessorService) {}
  async processImages(image) {
    const smallImage = await this.imageProcessor.createImageAtSize(
      image,
      Sizes.SMALL
    );
    const largeImage = await this.imageProcessor.createImageAtSize(
      image,
      Sizes.LARGE
    );
    return { smallImage, largeImage };
  }
}
