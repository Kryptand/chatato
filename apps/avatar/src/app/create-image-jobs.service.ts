import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { generateTopicName } from '@kryptand/messaging/kafka-management';

const TOPIC_NAME = generateTopicName('avatar', 'cmd', 'image');
@Injectable()
export class CreateImageJobsService {
  constructor(@Inject('KAFKA_SERVICE') private readonly client: ClientKafka) {}

  async onModuleInit() {
    this.client.subscribeToResponseOf(TOPIC_NAME);
    await this.client.connect();
  }
  onModuleDestroy() {
    this.client.close();
  }
  putImageToMessagingService(image) {
    return this.client.send(TOPIC_NAME, image);
  }
}
