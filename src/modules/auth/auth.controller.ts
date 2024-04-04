import { Body, Controller, Post } from '@nestjs/common';
import { AuthDto } from '@modules/auth/auth.dto';
import { AuthService } from '@modules/auth/auth.service';
import { MailerProducer } from 'src/queue/producers/mailer.producer';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private readonly mailerProducer: MailerProducer) {}

  @Post('signin')
  signIn(@Body() dto: AuthDto) {
    return this.authService.signIn(dto);
  }

  @Post('signup')
  async signUp(@Body() dto: AuthDto) {
    await this.mailerProducer.resMail(dto.email);
    return this.authService.signUp(dto);
  }
}
