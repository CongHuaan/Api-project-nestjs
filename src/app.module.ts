import { AuthModule } from '@modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@module/database.module';
import { UserModule } from '@modules/user/user.module';
import { TodoModule } from '@modules/todo/todo.module';
import { Module } from '@nestjs/common';
import { QueueModule } from './queue/queue.module';
import { MailerConsumer } from './queue/consumers/mailer.consumer';
import { EmailController } from '@modules/mail/mail.controller';
import { MailerProducer } from './queue/producers/mailer.producer';
import { ScheduleModule } from '@nestjs/schedule';
import { EmailService } from '@modules/mail/mail.service';
import { CronService } from '@modules/mail/crons/mail.cron.service';
import { MailModule } from '@modules/mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    TodoModule,
    DatabaseModule,
    AuthModule,
    QueueModule,
    ScheduleModule.forRoot(),
    MailModule,
  ],
  providers: [],
  controllers: [],
})
export class AppModule {}
