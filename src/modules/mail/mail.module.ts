import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';
import { MailerConsumer } from 'src/queue/consumers/mailer.consumer';
import { MailerProducer } from 'src/queue/producers/mailer.producer';
import { EmailService } from '@modules/mail/mail.service';
import { CronService } from '@modules/mail/crons/mail.cron.service';
import { EmailController } from '@modules/mail/mail.controller';
import { AuthGuard } from '@modules/auth/guard/auth.guard';
import { AuthModule } from '@modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@modules/user/entities/user.entity';

@Module({
  imports: [
    ConfigModule, TypeOrmModule.forFeature([User]), AuthModule,
    BullModule.registerQueue({ name: 'mailer-queue' }),
  ],
  providers: [
    MailerProducer,
    EmailService,
    CronService,
  ],
  controllers: [EmailController],
})
export class MailModule {}