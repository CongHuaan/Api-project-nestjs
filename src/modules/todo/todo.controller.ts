import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { TodoService } from '@modules/todo/todo.service';
import { AuthGuard } from '@guard/auth.guard';
import { GetUser } from '@decorator/get-user.decorator';
import { User } from '@modules/user/entities/user.entity';
import { Todo } from '@modules/todo/entities/todo.entity';

@UseGuards(AuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
@Controller('todos')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get()
  async findAll(@GetUser() user: User) {
    return this.todoService.findAll(user.id);
  }

  @Post()
  async create(@Body() todoData: any, @GetUser() user: User) {
    const { title, description, completed } = todoData;
    const todo = new Todo();
    todo.title = title;
    todo.description = description;
    todo.completed = completed;
    console.log(todo);
    return this.todoService.create(user.id, todo);
  }

  @Put(':id')
  async update(
    @Body() todoData: any,
    @Param('id') idTodo: number,
    @GetUser() user: User,
  ) {
    const { title, description, completed } = todoData;
    const todo = new Todo();
    todo.title = title;
    todo.description = description;
    todo.completed = completed;
    return this.todoService.update(user.id, idTodo, todo);
  }

  @Delete(':id')
  async delete(@GetUser() user: User, @Param('id') id: number) {
    // console.log({
    //   msg1: user.id,
    //   msg2: id,
    // });
    this.todoService.delete(user.id, id);
    return {
      msg: 'Delete Successfully',
    };
  }
}
