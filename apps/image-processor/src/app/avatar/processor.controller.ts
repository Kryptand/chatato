import { Controller } from '@nestjs/common';
import { generateTopicName } from '@kryptand/messaging/kafka-management';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AvatarImageProcessorService } from './avatar-image-processor.service';
const TOPIC_NAME = generateTopicName('avatar', 'cmd', 'image');
@Controller()
export class ProcessorController {
  constructor(private avatarProcessor: AvatarImageProcessorService) {}
  @MessagePattern(TOPIC_NAME)
  async processImage(@Payload() message: any): Promise<any> {
    const { image, userId } = message.value;
    const images = await this.avatarProcessor.processImages(image);
    console.debug(images);
  }
}
