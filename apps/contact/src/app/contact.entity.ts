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
export class Contact {

  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 32})
  @Index()
  @IsString()
  @MaxLength(32)
  userId:string;

  @Column({ type: 'varchar', length: 500 })
  @IsString()
  @MaxLength(500)
  name: string;

  @Column({ type: 'varchar', length: 500 })
  @IsString()
  @MaxLength(500)
  contactSource: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
