import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

const SALT_ROUNDS = 10;

export type AuthResponse = {
  access_token: string;
};

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(username: string, unhashedPassword: string): Promise<string> {
    const password = await bcrypt.hash(unhashedPassword, SALT_ROUNDS);
    const user = await this.usersService.create(username, password);
    return user.username;
  }

  async logIn(
    username: string,
    unhashedPassword: string,
  ): Promise<AuthResponse | null> {
    const user = await this.usersService.findByUsername(username);

    if (!user || !(await bcrypt.compare(unhashedPassword, user.password))) {
      return null;
    }

    const payload = { sub: user._id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
