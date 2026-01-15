import { Injectable, ParseBoolPipe } from '@nestjs/common';
import { TodoDto, UpdateTodoDto, CreateTodoDto } from './dto/todo.dto';

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

  findAll(showIncomplete?: boolean,): TodoDto[] {
    // If using controller, apply ParseBoolPipe in the controller method, not here.
    if (showIncomplete) {
      return this.todos.filter((todo) => !todo.completed);
    }
    return this.todos;
  }

  markTodoCompleted(id: number): TodoDto | null {
    const todoIndex = this.todos.findIndex((t) => t.id === id);
    if (todoIndex < 0) {
      return null;
    }

    this.todos[todoIndex] = {
      ...this.todos[todoIndex],
      completed: true,
    };
    return this.todos[todoIndex];
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
    const newTodos = this.todos.filter((todo) => todo.id !== id);
    this.todos = newTodos;
  }
}
