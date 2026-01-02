import { Injectable } from '@nestjs/common';
import { TodoDto, UpdateTodoDto } from './dto/todo.dto';
import { CreateTodoDto } from './dto/todo.dto';

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

  findAll(): TodoDto[] {
    return this.todos;
  }

  findOne(id: number): TodoDto | null {
    return this.todos.find((todo) => todo.id === id) || null;
  }

  create(todo: CreateTodoDto): TodoDto {
    const newTodo: TodoDto = {
      id: Date.now(),
      ...todo,
      completed: false,
    };

    this.todos.push(newTodo);
    return newTodo;
  }

  update(id: number, todo: UpdateTodoDto): TodoDto | null {
    const todoIndex = this.todos.findIndex((t) => t.id === id);
    if (todoIndex < 0) {
      return null;
    }

    this.todos[todoIndex] = {
      ...this.todos[todoIndex],
      ...todo,
    };
    return this.todos[todoIndex];
  }
  
  remove(id: number): void {
    const newTodos = this.todos.filter(todo => todo.id !== id)
    this.todos = newTodos;
  }
}
