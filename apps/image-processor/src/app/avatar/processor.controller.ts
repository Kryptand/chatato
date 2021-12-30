import { Controller } from '@nestjs/common';
import { generateTopicName } from '@kryptand/messaging/kafka-management';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProcessorService } from './processor.service';

const TOPIC_NAME = generateTopicName('avatar', 'cmd', 'image');
@Controller()
export class ProcessorController {
  constructor(private processor: ProcessorService) {}
  @MessagePattern(TOPIC_NAME)
  async processImage(@Payload() message: any): Promise<any> {
    return await this.processor.processImage(message);
  }
}
