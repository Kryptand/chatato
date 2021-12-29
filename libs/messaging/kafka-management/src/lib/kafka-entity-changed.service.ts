import { Inject, Injectable } from '@nestjs/common';
import { EntityChangedTopicNamingService } from './entity-changed-topic-naming.service';
import { ClientKafka } from '@nestjs/microservices';
import { Observable } from 'rxjs';

export interface EntityChangedMessagingService {
  produceCreateMessage(entity): Observable<any>;

  produceCreatedMessage(entity): Observable<any>;

  produceUpdateMessage(entity): Observable<any>;

  produceUpdatedMessage(entity): Observable<any>;

  produceRemoveMessage(entity): Observable<any>;

  produceRemovedMessage(entity): Observable<any>;
}

export abstract class AbstractEntityChangedMessagingService
  implements EntityChangedMessagingService
{
  abstract produceCreateMessage(entity): Observable<any>;

  abstract produceCreatedMessage(entity): Observable<any>;

  abstract produceUpdateMessage(entity): Observable<any>;

  abstract produceUpdatedMessage(entity): Observable<any>;

  abstract produceRemoveMessage(entity): Observable<any>;

  abstract produceRemovedMessage(entity): Observable<any>;
}

@Injectable()
export class KafkaEntityChangedService extends AbstractEntityChangedMessagingService {
  constructor(
    private namingService: EntityChangedTopicNamingService,
    @Inject('KAFKA_SERVICE') private readonly client: ClientKafka
  ) {
    super();
  }

  async onModuleInit() {
    ['Create', 'Created', 'Update', 'Updated', 'Delete', 'Deleted'].forEach(
      (key) => {
        this.client.subscribeToResponseOf(
          this.namingService.generateTopicName(key)
        );
      }
    );

    await this.client.connect();
  }

  onModuleDestroy() {
    return this.client.close();
  }

  produceCreateMessage(entity): Observable<any> {
    return this.client.send(this.namingService.createTopicName(), entity);
  }
  produceCreatedMessage(entity): Observable<any> {
    return this.client.send(this.namingService.createdTopicName(), entity);
  }
  produceUpdateMessage(entity): Observable<any> {
    return this.client.send(this.namingService.updateTopicName(), entity);
  }
  produceUpdatedMessage(entity): Observable<any> {
    return this.client.send(this.namingService.updatedTopicName(), entity);
  }
  produceRemoveMessage(entity): Observable<any> {
    return this.client.send(this.namingService.removeTopicName(), entity);
  }
  produceRemovedMessage(entity): Observable<any> {
    return this.client.send(this.namingService.removedTopicName(), entity);
  }
}
