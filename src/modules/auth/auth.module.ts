import { Module } from '@nestjs/common';
import { AuthController } from '@controller/auth.controller';
import { AuthService } from '@service/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@entity/user.entity';

@Module({
  imports: [JwtModule, TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
