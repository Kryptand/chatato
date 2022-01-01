import {
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Message } from '../messages/message.entity';
import { ChatParticipant } from './chat-participant.entity';
import { ChatMessage } from './chat-message.entity';

@Entity()
export class Chat {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany((type) => Message, (message) => message.chat)
  messages: Message[];

  @OneToMany(
    (type) => ChatParticipant,
    (chatParticipant) => chatParticipant.chat
  )
  participants: ChatParticipant[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
