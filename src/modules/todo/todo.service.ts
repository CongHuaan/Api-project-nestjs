import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DataSource, Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';
import { User } from '../user/entities/user.entity';

@Injectable()
export class TodoService {
    constructor(
        private dataSource: DataSource,
    ) { }

    async findAll(userId: number): Promise<Todo[]> {
        const userRepository = this.dataSource.getRepository(User);
        const user = await userRepository.findOne({
            where: { id: userId }, relations: ['todos']
        });
        return user.todos;
    }

    async create(userId: number, todo: Todo): Promise<Todo> {
        const todoRepository = this.dataSource.getRepository(Todo);
        const userRepository = this.dataSource.getRepository(User);
        const user = await userRepository.findOne({ 
            where: { id: userId } 
        });
        const newTodo = todoRepository.create({ ...todo, user });
        return todoRepository.save(newTodo);
    }

    async update(userId: number, todoId: number, todo: Todo): Promise<Todo> {
        const todoRepository = this.dataSource.getRepository(Todo);
        console.log(todo);
        await todoRepository.update({ 
            id: todoId, user: { id: userId } 
        }, {...todo});
        return todoRepository.findOne({ 
            where: { id: todoId, user: { id: userId } } 
        });
    }

    async delete(userId: number, todoId: number): Promise<void> {
        const todoRepository = this.dataSource.getRepository(Todo);
        await todoRepository.delete({ 
            id: todoId, user: { id: userId } 
        });
    }
}