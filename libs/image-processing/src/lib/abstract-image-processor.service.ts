import { Sizes } from './sizes';

export abstract class AbstractImageProcessorService {
  abstract createImageAtSize(image, size: Sizes): Promise<any>;
}
