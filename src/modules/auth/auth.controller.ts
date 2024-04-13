import { Body, Controller, Inject, Post } from '@nestjs/common';
import { AuthDto } from '@modules/auth/auth.dto';
import { AuthService } from '@modules/auth/auth.service';
import { MailerProducer } from 'src/queue/producers/mailer.producer';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Subject } from 'rxjs';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  signIn(@Body() dto: AuthDto) {
    return this.authService.signIn(dto);
  }

  @Post('signup')
  async signUp(@Body() dto: AuthDto) {
    return this.authService.signUp(dto);
  }
}
