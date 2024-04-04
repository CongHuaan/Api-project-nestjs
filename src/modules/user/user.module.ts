import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from '@modules/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@modules/user/entities/user.entity';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [TypeOrmModule.forFeature([User]), CacheModule.register()],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
