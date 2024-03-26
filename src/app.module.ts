import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './base/database/database.module';
import { UserModule } from './modules/user/user.module';
import { TodoModule } from './modules/todo/todo.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    TodoModule,
    DatabaseModule,
    AuthModule,
  ],
})
export class AppModule {}
