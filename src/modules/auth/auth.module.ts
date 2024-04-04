import { Module } from '@nestjs/common';
import { AuthController } from '@modules/auth/auth.controller';
import { AuthService } from '@modules/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@modules/user/entities/user.entity';
import { MailerProducer } from 'src/queue/producers/mailer.producer';
import { QueueModule } from 'src/queue/queue.module';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    JwtModule,
    TypeOrmModule.forFeature([User]),
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
  controllers: [AuthController],
  providers: [AuthService, MailerProducer],
})
export class AuthModule {}
