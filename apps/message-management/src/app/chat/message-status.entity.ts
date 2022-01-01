import { Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Message } from '../messages/message.entity';
import { ChatParticipant } from './chat-participant.entity';

@Entity()
export class MessageStatus {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @OneToOne((type) => Message)
  message: Message;

  @OneToOne((type) => ChatParticipant)
  participant: ChatParticipant;
}
