import { BullModule } from '@nestjs/bull';
import { Global, Module } from '@nestjs/common';
import { MailerProducer } from './producers/mailer.producer';
import { MailerConsumer } from './consumers/mailer.consumer';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },

    }),
    BullModule.registerQueue({
      name: 'mailer-queue',
    }),
  ],
  providers: [MailerProducer, MailerConsumer],
  exports: [MailerProducer],
})
export class QueueModule {}