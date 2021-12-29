import { Module } from '@nestjs/common';
import { EntityChangedTopicNamingService } from './entity-changed-topic-naming.service';
import {
  AbstractEntityChangedMessagingService,
  KafkaEntityChangedService,
} from './kafka-entity-changed.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KafkaConfig } from '@nestjs/microservices/external/kafka.interface';

@Module({})
export class KafkaManagementModule {
  public static forFeature(connectionOptions: {
    domain: string;
    entityName: string;
    client: KafkaConfig;
    groupId: string;
  }) {
    return {
      module: KafkaManagementModule,
      imports: [
        ClientsModule.register([
          {
            name: 'KAFKA_SERVICE',
            transport: Transport.KAFKA,
            options: {
              client: connectionOptions.client,
              consumer: {
                groupId: connectionOptions.groupId,
              },
            },
          },
        ]),
      ],
      providers: [
        {
          provide: 'DOMAIN',
          useValue: connectionOptions.domain,
        },
        {
          provide: 'ENTITY_NAME',
          useValue: connectionOptions.entityName,
        },
        EntityChangedTopicNamingService,
        KafkaEntityChangedService,
        {
          provide: AbstractEntityChangedMessagingService,
          useClass: KafkaEntityChangedService,
        },
      ],
      exports: [
        KafkaEntityChangedService,
        {
          provide: AbstractEntityChangedMessagingService,
          useClass: KafkaEntityChangedService,
        },
      ],
    };
  }
}
