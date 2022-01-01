import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ActivityProducerService } from './activity-producer.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'activity-producer',
            brokers: ['localhost:29092'],
          },
          consumer: {
            groupId: 'activity-group',
          },
        },
      },
    ]),
  ],
  providers: [ActivityProducerService],
})
export class ActivityProducerModule {}
