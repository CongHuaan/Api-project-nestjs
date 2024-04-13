import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
@Processor('mailer-queue')
export class MailerConsumer {
  constructor(
    private config: ConfigService,
    private mailService: MailerService,
  ) {}

  @Process('send-mail')
  async sendMail(job: Job<any>) {
    const { data } = job;
    console.log(data);
    try {
      await this.mailService.sendMail({
        to: data.to,
        subject: data.subject,
        html: data.body,
      });
      console.log(`Email sent to ${data.to} with subject ${data.subject}`);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }

  @Process('daily-mail')
  async dailyMail() {
    try {
      await this.mailService.sendMail({
        from: this.config.get('AUTHER_MAIL'),
        to: this.config.get('CL_EMAIL'),
        subject: this.config.get('DR'),
        text: this.config.get('DR_DATA'),
      });
      console.log(`Email sent to ${this.config.get('CL_EMAIL')}`);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
}
