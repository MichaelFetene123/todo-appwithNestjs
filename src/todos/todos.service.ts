import { Injectable } from '@nestjs/common';
import { TodoDto } from './dto/todo.dto';

@Injectable()
export class TodosService {
  private todos: TodoDto[] = [
    {
      id: 1,
      title: 'Learn NestJS',
      description: 'Learn how to build with NestJS',
      completed: true,
    },
    {
      id: 2,
      title: 'Learn REST',
      description: 'Learn how to build interactive REST APIs',
      completed: false,
    },
  ];
  findAll( ): TodoDto[] {
    return this.todos;
  }

  findOne(id: number): TodoDto | null {
    return this.todos.find((todo) => todo.id === id) || null;
  }
}
