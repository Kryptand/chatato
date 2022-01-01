import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Chat } from './chat.entity';
import { IsString, MaxLength } from 'class-validator';

@Entity()
export class ChatParticipant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne((type) => Chat, (chat) => chat.participants)
  chat: Chat;

  @Column({ type: 'varchar', length: 32 })
  @Index()
  @IsString()
  @MaxLength(32)
  userId: string;
}
