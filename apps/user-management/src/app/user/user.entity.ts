import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn, Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@Unique(['username','contactSource'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  username: string;

  @Column()
  contactSource?: string;

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @Column()
  lastIp?: string;

  @Column()
  lastUserAgent?: string;

  @Column()
  lastLoginAt?: Date;

  @Column()
  lastFailedLoginAt?: Date;

  @Column()
  failedLoginCount?: number;
}
