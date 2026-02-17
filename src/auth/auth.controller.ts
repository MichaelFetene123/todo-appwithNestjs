import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsernameWithPasswordDto } from './dtos/auth.dto';
import { Public } from './decorator/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  async register(@Body() createUserDto: UsernameWithPasswordDto) {
    const { username, password } = createUserDto;
    return await this.authService.register(username, password);
  }

  @Public()
  @Post('login')
  async login(@Body() loginUserDto: UsernameWithPasswordDto ) {
    const { username, password } = loginUserDto;

    const token = await this.authService.logIn(username, password);

    if (!token) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    return token;
  }
}
