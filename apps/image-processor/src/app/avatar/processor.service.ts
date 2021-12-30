import { Injectable } from '@nestjs/common';
import { AvatarImageProcessorService } from './avatar-image-processor.service';
import { AvatarPersistorService } from './avatar-persistor.service';
import { SizeTextRepresentation } from '@chatato/image-processing';

@Injectable()
export class ProcessorService {
  constructor(
    private avatarProcessor: AvatarImageProcessorService,
    private persistAvatar: AvatarPersistorService
  ) {}

  async processImage(message) {
    try {
      const { image, userId } = message.value;
      const images = await this.avatarProcessor.processImages(image);
      const smallImageId = await this.persistAvatar.persistAvatarImage(
        userId,
        SizeTextRepresentation.SMALL,
        images.smallImage
      );
      const largeImageId = await this.persistAvatar.persistAvatarImage(
        userId,
        SizeTextRepresentation.LARGE,
        images.largeImage
      );
      return {
        status: 'success',
        small: smallImageId,
        large: largeImageId,
      };
    } catch (e) {
      return {
        status: 'error',
        error: e,
      };
    }
  }
}
