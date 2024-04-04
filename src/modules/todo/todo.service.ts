import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from '@modules/todo/entities/todo.entity';
import { User } from '@modules/user/entities/user.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  async findAll(userId: number): Promise<Todo[]> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['todos'],
    });
    return user.todos;
  }

  async create(userId: number, todo: Todo): Promise<Todo> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    const newTodo = this.todoRepository.create({ ...todo, user });
    return this.todoRepository.save(newTodo);
  }

  async update(userId: number, todoId: number, todo: Todo): Promise<Todo> {
    console.log(todo);
    await this.todoRepository.update(
      {
        id: todoId,
        user: { id: userId },
      },
      { ...todo },
    );
    return this.todoRepository.findOne({
      where: { id: todoId, user: { id: userId } },
    });
  }

  async delete(userId: number, todoId: number): Promise<void> {
    await this.todoRepository.delete({
      id: todoId,
      user: { id: userId },
    });
  }
}
