import { Body, Controller, Post } from '@nestjs/common';
import { MailerProducer } from 'src/queue/producers/mailer.producer';

@Controller('email')
export class EmailController {
  constructor(private readonly mailerProducer: MailerProducer) {}

  @Post('send')
  async sendEmail(@Body() body: { to: string; subject: string; text: string }) {
    await this.mailerProducer.sendMail(body);
    return { message: 'Email sent to queue' };
  }
}