import { Module } from '@nestjs/common';
import { FileManagementModule } from '@kryptand/file-management';
import { CreateImageJobsService } from './create-image-jobs.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Avatar } from './avatar.entity';
import { AvatarController } from './avatar.controller';
import { AvatarService } from './avatar.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Avatar]),
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'avatar',
            brokers: ['localhost:29092'],
          },
          consumer: {
            groupId: 'avatar-group',
          },
        },
      },
    ]),
    FileManagementModule.forFeature('USER_AVATAR'),
  ],
  providers: [CreateImageJobsService, AvatarService],
  controllers: [AvatarController],
})
export class AvatarModule {}
