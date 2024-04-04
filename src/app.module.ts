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
  ],
  providers: [
    MailerConsumer,
  ],
  controllers: [
    EmailController,
  ]
})
export class AppModule {}
