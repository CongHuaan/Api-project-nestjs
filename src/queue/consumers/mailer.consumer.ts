import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
@Processor('mailer-queue')
export class MailerConsumer {
  constructor(private config: ConfigService) {}

  @Process('send-mail')
  async sendMail(job: Job<any>) {
    const { data } = job;
    console.log(data);
    
    try {
      // Tạo transporter cho Gmail
      const transporter = nodemailer.createTransport({
        host: this.config.get('SMTP_HOST'),
        port: parseInt(this.config.get('SMTP_PORT')),
        auth: {
          user: this.config.get('SMTP_USER'),
          pass: this.config.get('SMTP_PASS'),
        },
      });

      // Tạo options cho email
      const mailOptions = {
        from: 'abcxcsa123123@gmail.com',
        to: data.to,
        subject: data.subject,
        text: data.text,
      };

      // Gửi email
      await transporter.sendMail(mailOptions);
      console.log(`Email sent to ${data.to} with subject ${data.subject}`);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }

  @Process('daily-mail')
  async dailyMail() {
    try {
      // Tạo transporter cho Gmail
      const transporter = nodemailer.createTransport({
        host: this.config.get('SMTP_HOST'),
        port: parseInt(this.config.get('SMTP_PORT')),
        auth: {
          user: this.config.get('SMTP_USER'),
          pass: this.config.get('SMTP_PASS'),
        },
      });

      // Tạo options cho email
      const mailOptions = {
        from: 'anhhuaan@gmail.com',
        to: 'duc@gmail.com',
        subject: 'Daily Report',
        text: 'This is a daily report email.',
      };

      // Gửi email
      await transporter.sendMail(mailOptions);
      console.log(`Email sent to duc@gmail.com`);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
}