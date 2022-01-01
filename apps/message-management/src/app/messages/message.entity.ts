import {
  Column,
  CreateDateColumn,
  Entity, ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ChatEntity } from '../chat/chat.entity';

// export enum MessageStatus {
//   SENT = 'sent',
//   DELIVERED = 'delivered',
//   READ = 'read',
// }
// @Column({
//   type: 'enum',
//   enum: MessageStatus,
//   default: MessageStatus.SENT,
// })
// status: MessageStatus;
@Entity()
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column('jsonb')
  content: any;

  @ManyToOne(type => ChatEntity, chat => chat.messages)
  chat: ChatEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
