import { Module } from '@nestjs/common';
import { AuthModule } from '@module/auth.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@module/database.module';
import { UserModule } from '@module/user.module';
import { TodoModule } from '@module/todo.module';

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
