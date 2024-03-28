import { Module } from '@nestjs/common';
import { TodoController } from '@controller/todo.controller';
import { TodoService } from '@service/todo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from '@entity/todo.entity';
import { User } from '@entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Todo, User])],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
