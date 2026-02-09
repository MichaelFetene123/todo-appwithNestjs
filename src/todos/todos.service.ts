import { Injectable} from '@nestjs/common';
import { TodoDto, UpdateTodoDto, CreateTodoDto } from './dto/todo.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo, TodoDocument } from './schemas/todo.schemas';

@Injectable()
export class TodosService {
  // private todos: TodoDto[] = [
  //   {
  //     id: 1,
  //     title: 'Learn NestJS',
  //     description: 'Learn how to build with NestJS',
  //     completed: true,
  //   },
  //   {
  //     id: 2,
  //     title: 'Learn REST',
  //     description: 'Learn how to build interactive REST APIs',
  //     completed: false,
  //   },
  // ];
  constructor(
    @InjectModel(Todo.name) private readonly todoModel: Model<TodoDocument>,
  ) {}

  // findAll(showIncomplete?: boolean,): TodoDto[] {
  //   // If using controller, apply ParseBoolPipe in the controller method, not here.
  //   if (showIncomplete) {
  //     return this.todos.filter((todo) => !todo.completed);
  //   }
  //   return this.todos;
  // }

  async findAll(showIncomplete?: boolean): Promise<TodoDocument[]> {
    const filter: any = {};

    if (showIncomplete) {
      filter.completed = false;
    }
    return await this.todoModel.find(filter).exec();
  }

  /**  findOne(id: number): TodoDto | null {
    return this.todos.find((todo) => todo.id === id) || null;
  } */

  async findOne(id: string): Promise<TodoDocument | null> {
    return await this.todoModel.findById(id).exec();
  }

  // create(todo: CreateTodoDto): TodoDto {
  //   const newTodo: TodoDto = {
  //     id: Date.now(),
  //     ...todo,
  //     completed: false,
  //   };

  //   this.todos.push(newTodo);
  //   return newTodo;
  // }

  async createTodo(todo: CreateTodoDto): Promise<TodoDocument> {
    const createdTodo = new this.todoModel(todo)
    return await createdTodo.save();
  }

  // updateTodo(id: number, todo: UpdateTodoDto): TodoDto | null {
  //   const todoIndex = this.todos.findIndex((t) => t.id === id);
  //   if (todoIndex < 0) {
  //     return null;
  //   }

  //   this.todos[todoIndex] = {
  //     ...this.todos[todoIndex],
  //     ...todo,
  //   };
  //   return this.todos[todoIndex];
  // }

  async updateTodo(id: string, todo: UpdateTodoDto): Promise<TodoDocument | null> {
    return await this.todoModel.findByIdAndUpdate(id, todo, { new: true }).exec();
  }
  
  // markTodoCompleted(id: number): TodoDto | null {
  //   const todoIndex = this.todos.findIndex((t) => t.id === id);
  //   if (todoIndex < 0) {
  //     return null;
  //   }

  //   this.todos[todoIndex] = {
  //     ...this.todos[todoIndex],
  //     completed: true,
  //   };
  //   return this.todos[todoIndex];
  // }
async markTodoComplete(id: string): Promise<TodoDocument | null> {
  return await this.todoModel.findByIdAndUpdate(id, { completed: true }, { new: true }).exec();
}

  // remove(id: string): void {
  //   const newTodos = this.todos.filter((todo) => todo.id !== id);
  //   this.todos = newTodos;
  // }

  async deleteTodo(id: string): Promise<TodoDocument | null> {
    return await this.todoModel.findByIdAndDelete(id).exec();
}
}