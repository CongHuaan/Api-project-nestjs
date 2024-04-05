import { Module } from '@nestjs/common';
import { AuthController } from '@modules/auth/auth.controller';
import { AuthService } from '@modules/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@modules/user/entities/user.entity';
import { MailerProducer } from 'src/queue/producers/mailer.producer';
import { BullModule } from '@nestjs/bull';
import { CacheModule } from '@nestjs/cache-manager';

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
    CacheModule.register(),
  ],
  controllers: [AuthController],
  providers: [AuthService, MailerProducer],
})
export class AuthModule {}
