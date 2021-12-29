import { Connection, EventSubscriber } from 'typeorm';
import {
  AbstractEntityChangedMessagingService,
  AbstractProduceMessagesSubscriber,
} from '@kryptand/messaging/kafka-management';
import { Contact } from './contact.entity';

@EventSubscriber()
export class ContactSubscriber extends AbstractProduceMessagesSubscriber<Contact> {
  constructor(
    connection: Connection,
    service: AbstractEntityChangedMessagingService
  ) {
    super(connection, Contact, service);
    connection.subscribers.push(this);
  }
}
