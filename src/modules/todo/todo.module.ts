import { Module } from '@nestjs/common';
import { TodoController } from '@modules/todo/todo.controller';
import { TodoService } from '@modules/todo/todo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from '@modules/todo/entities/todo.entity';
import { User } from '@modules/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Todo, User])],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
