import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsString, MaxLength } from 'class-validator';

@Entity()
export class Activity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 32 })
  @Index()
  @IsString()
  @MaxLength(32)
  userId: string;

  @CreateDateColumn()
  lastActivityAt!: Date;
}
