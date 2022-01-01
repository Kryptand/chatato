import { Controller, Request, Post, UseGuards, Logger } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern } from '@nestjs/microservices';
import { LocalAuthGuard } from '@chatato/auth';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth')
  async login(@Request() req) {
    return this.userService.authenticate(req.user);
  }

  @MessagePattern({ role: 'auth', cmd: 'check' })
  async loggedIn(data) {
    try {
      const res = this.userService.validateToken(data.jwt);

      return res;
    } catch (e) {
      Logger.log(e);
      return false;
    }
  }
  @Post('register')
  async register(@Request() req) {
    await this.userService.register(req.body);
  }
  @Post('update')
  async update(@Request() req) {
    await this.userService.update(req.body.id, req.body);
  }
}
