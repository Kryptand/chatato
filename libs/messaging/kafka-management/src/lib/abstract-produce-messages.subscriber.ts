import {
  Connection,
  EntitySubscriberInterface,
  InsertEvent,
  RemoveEvent,
  UpdateEvent,
} from 'typeorm';
import { AbstractEntityChangedMessagingService } from './kafka-entity-changed.service';

export abstract class AbstractProduceMessagesSubscriber<T>
  implements EntitySubscriberInterface<T>
{
  constructor(
    connection: Connection,
    protected entity: any,
    protected service: AbstractEntityChangedMessagingService
  ) {}

  listenTo() {
    return this.entity;
  }

  beforeInsert(event: InsertEvent<T>) {
    this.service.produceCreateMessage(event.entity).subscribe();
  }

  beforeRemove(event: RemoveEvent<T>) {
    this.service.produceRemoveMessage(event.entity).subscribe();
  }

  beforeUpdate(event: UpdateEvent<T>) {
    this.service.produceUpdateMessage(event.entity).subscribe();
  }

  afterInsert(event: InsertEvent<T>) {
    this.service.produceCreatedMessage(event.entity).subscribe();
  }

  afterUpdate(event: UpdateEvent<T>) {
    this.service.produceUpdatedMessage(event.entity).subscribe();
  }

  afterRemove(event: RemoveEvent<T>) {
    this.service.produceRemovedMessage(event.entity).subscribe();
  }
}
