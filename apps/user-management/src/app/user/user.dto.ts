export class RegisterUserDto {
  readonly username: string;
  readonly contactSource: string;
  readonly password: string;
  readonly userAgent: string;
  readonly userIp: string;
  readonly at: Date;
}
export class LoginUserDto {
  readonly username: string;
  readonly password: string;
  readonly userAgent: string;
  readonly userIp: string;
  readonly at: Date;
}
export class UpdateUserDto {
  readonly username: string;
  readonly contactSource: string;
  readonly password: string;
  readonly userAgent: string;
  readonly userIp: string;
  readonly at: Date;
}
