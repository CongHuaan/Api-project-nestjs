import { AuthModule } from '@modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@module/database.module';
import { UserModule } from '@modules/user/user.module';
import { TodoModule } from '@modules/todo/todo.module';
import { Module } from '@nestjs/common';
import { QueueModule } from './queue/queue.module';
import { ScheduleModule } from '@nestjs/schedule';
import { MailModule } from '@modules/mail/mail.module';
import { APP_GUARD, Reflector } from '@nestjs/core';
import { AuthGuard } from '@modules/auth/guard/auth.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@modules/user/entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forFeature([User]),
    UserModule,
    TodoModule,
    DatabaseModule,
    AuthModule,
    QueueModule,
    ScheduleModule.forRoot(),
    MailModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    Reflector,
  ],
  controllers: [],
})
export class AppModule {}
