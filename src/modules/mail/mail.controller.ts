import { AuthGuard } from '@modules/auth/guard/auth.guard';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { MailerProducer } from 'src/queue/producers/mailer.producer';

@Controller('email')
export class EmailController {
  constructor(private readonly mailerProducer: MailerProducer) {}

  @UseGuards(AuthGuard)
  @Post('send')
  async sendEmail(@Body() body: { to: string; subject: string; text: string }) {
    await this.mailerProducer.sendMail(body);
    return { message: 'Email sent to queue' };
  }
}