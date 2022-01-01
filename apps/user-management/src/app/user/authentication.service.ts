import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticationService {
  constructor(private readonly jwtService: JwtService) {}

  async login(user) {
    const payload = { user, sub: user.id };

    return {
      userId: user.id,
      accessToken: this.jwtService.sign(payload),
    };
  }
  validateToken(jwt: string) {
    return this.jwtService.verify(jwt);
  }
}
