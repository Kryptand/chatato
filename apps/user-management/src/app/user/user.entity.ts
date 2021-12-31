import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  avatar: string;

  @Column()
  contactSource: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @Column()
  role: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @Column()
  resetPasswordToken: string;

  @Column()
  resetPasswordExpires: Date;

  @Column()
  lastLogin: Date;

  @Column()
  lastIp: string;

  @Column()
  lastUserAgent: string;

  @Column()
  lastLoginAt: Date;

  @Column()
  lastLoginIp: string;

  @Column()
  lastLoginUserAgent: string;

  @Column()
  lastFailedLogin: Date;

  @Column()
  lastFailedLoginIp: string;

  @Column()
  lastFailedLoginUserAgent: string;

  @Column()
  lastFailedLoginAt: Date;

  @Column()
  failedLoginCount: number;

  @Column()
  lastLockedOut: Date;

  @Column()
  lastLockedOutIp: string;

  @Column()
  lastLockedOutUserAgent: string;

  @Column()
  lastLockedOutAt: Date;

  @Column()
  lockedOutCount: number;

  @Column()
  lastPasswordChange: Date;

  @Column()
  lastPasswordChangeIp: string;

  @Column()
  lastPasswordChangeUserAgent: string;

  @Column()
  lastPasswordChangeAt: Date;

  @Column()
  passwordChangeCount: number;

  @Column()
  lastPasswordReset: Date;

  @Column()
  lastPasswordResetIp: string;
}
