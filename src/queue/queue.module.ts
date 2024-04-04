import { BullModule } from '@nestjs/bull';
import { Global, Module } from '@nestjs/common';
import { MailerProducer } from './producers/mailer.producer';

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
  providers: [MailerProducer],
  exports: [MailerProducer],
})
export class QueueModule {}