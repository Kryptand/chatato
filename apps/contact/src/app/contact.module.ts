import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from './contact.entity';
import { KafkaManagementModule } from '@kryptand/messaging/kafka-management';
import { ContactSubscriber } from './contact.subscriber';

@Module({
  imports: [
    TypeOrmModule.forFeature([Contact]),
    KafkaManagementModule.forFeature({
      domain: 'contact',
      entityName: 'contact',
      client: {
        brokers: ['localhost:29092'],
      },
      groupId: 'contact-group',
    }),
  ],
  exports: [ContactService],
  providers: [ContactService, ContactSubscriber],
  controllers: [ContactController],
})
export class ContactModule {}
