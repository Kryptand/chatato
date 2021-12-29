import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsString, MaxLength } from 'class-validator';

@Entity()
export class Avatar {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsString()
  @MaxLength(2000)
  originalTitle: string;

  @Column({ type: 'varchar', length: 32 })
  @Index()
  @IsString()
  @MaxLength(32)
  userId: string;

  @Column({ type: 'float' })
  sizeInMb: number;

  @Column()
  @IsString()
  format: string;

  @Column({ type: 'date' })
  capturedAt: Date;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
