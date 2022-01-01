import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthenticationService } from './authentication.service';
import { AuthModule } from '@chatato/auth';
@Module({
  imports: [TypeOrmModule.forFeature([User]), AuthModule],
  controllers: [UserController],
  providers: [AuthenticationService, UserService],
})
export class UserModule {}
