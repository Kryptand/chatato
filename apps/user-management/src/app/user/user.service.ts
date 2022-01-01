import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginUserDto, RegisterUserDto, UpdateUserDto } from './user.dto';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private authenticateService: AuthenticationService
  ) {}
  validateToken(token: string): Promise<User> {
    return this.authenticateService.validateToken(token);
  }
  authenticate(userDto: LoginUserDto) {
    return this.userRepository
      .findOne({
        where: { username: userDto.username },
        select: ['id', 'username', 'password'],
      })
      .then((user) => {
        if (user && bcrypt.compareSync(userDto.password, user.password)) {
          this.logLoginInformation(user, userDto);
          return this.authenticateService.login(user);
        }
        this.logFailedLoign(user, userDto);
        return null;
      });
  }

  private logFailedLoign(user: User, userDto: LoginUserDto) {
    this.userRepository.update(user.id, {
      lastUserAgent: userDto.userAgent,
      lastIp: userDto.userIp,
      lastFailedLoginAt: new Date(),
      failedLoginCount: user.failedLoginCount + 1,
    });
  }

  private logLoginInformation(user: User, userDto: LoginUserDto) {
    this.userRepository.update(user.id, {
      lastUserAgent: userDto.userAgent,
      lastIp: userDto.userIp,
      lastLoginAt: new Date(),
      failedLoginCount: 0,
    });
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }
  findOne(id: string): Promise<User> {
    return this.userRepository.findOne(id);
  }

  async update(id: string, user: UpdateUserDto): Promise<User> {
    await this.userRepository.update(id, user);
    return this.userRepository.findOne(id);
  }
  async delete(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
  async register(user: RegisterUserDto): Promise<User> {
    const userExists = await this.userRepository.findOne({
      username: user.username,
    });
    if (userExists) {
      throw new Error('User already exists');
    }
    const hashedUser = await this.hashPassword(user);
    return this.userRepository.save(hashedUser);
  }

  private async hashPassword(user: RegisterUserDto) {
    const hash = await bcrypt.hash(user.password, 10);
    return {
      ...user,
      password: hash,
    };
  }
}
