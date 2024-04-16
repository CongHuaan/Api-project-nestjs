import { Module } from '@nestjs/common';
import { TodoController } from '@modules/todo/todo.controller';
import { TodoService } from '@modules/todo/todo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from '@modules/todo/entities/todo.entity';
import { User } from '@modules/user/entities/user.entity';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [TypeOrmModule.forFeature([Todo, User]), CacheModule.register()],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
