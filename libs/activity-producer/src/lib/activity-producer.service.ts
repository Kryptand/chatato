import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import {
  GENERAL_ACTIVITY_TOPIC_NAME,
  INITIAL_ACTIVITY_TOPIC_NAME,
} from './topics';
const userActivityMap = new Map<string, Date>();
@Injectable()
export class ActivityProducerService {
  constructor(@Inject('KAFKA_SERVICE') private readonly client: ClientKafka) {}

  async onModuleInit() {
    await this.client.connect();
  }
  onModuleDestroy() {
    this.client.close();
  }
  createInitialActivity(userId: string) {
    return this.client.send(INITIAL_ACTIVITY_TOPIC_NAME, userId);
  }
  updateActivityState(userId: string) {
    const lastActivity = userActivityMap.get(userId);
    const UPDATE_TIMEOUT_IN_S = 10;

    if (!lastActivity) {
      userActivityMap.set(userId, new Date());
      return this.createInitialActivity(userId);
    }

    const now = new Date();
    const diff = now.getTime() - lastActivity.getTime();

    if (diff > UPDATE_TIMEOUT_IN_S) {
      userActivityMap.set(userId, now);
      return this.client.send(GENERAL_ACTIVITY_TOPIC_NAME, userId);
    }
  }
}
