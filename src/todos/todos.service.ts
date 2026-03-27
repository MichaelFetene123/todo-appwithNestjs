import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo, TodoDocument } from './schemas/todo.schemas';
import { CreateTodoDto, UpdateTodoDto } from './dto/todo.dto';

@Injectable()
export class TodosService {
  constructor(
    @InjectModel(Todo.name)
    private readonly todoModel: Model<TodoDocument>,
  ) {}

  async findAll(userId: string, showIncomplete?: boolean): Promise<Todo[]> {
    const filter: any = {
      ownerId: userId,
    };

    if (showIncomplete) {
      filter.completed = false;
    }

    return this.todoModel.find(filter).exec();
  }

  async findOne(userId: string, id: string): Promise<TodoDocument | null> {
    return this.todoModel.findOne({ _id: id, ownerId: userId }).exec();
  }

  async createTodo(userId: string, todo: CreateTodoDto): Promise<TodoDocument> {
    const createdTodo = new this.todoModel({
      ownerId: userId,
      ...todo,
    });

    return createdTodo.save();
  }

  async updateTodo(
    userId: string,
    id: string,
    todo: UpdateTodoDto,
  ): Promise<TodoDocument | null> {
    const foundTodo = await this.findOne(userId, id);

    if (!foundTodo) {
      return null;
    }

    Object.assign(foundTodo, todo);
    return foundTodo.save();
  }

  async markTodoComplete(
    userId: string,
    id: string,
  ): Promise<TodoDocument | null> {
    return this.updateTodo(userId, id, { completed: true });
  }

  async deleteTodo(userId: string, id: string): Promise<TodoDocument | null> {
    const foundTodo = await this.findOne(userId, id);

    if (!foundTodo) {
      return null;
    }

    await foundTodo.deleteOne();
    return foundTodo;
  }
}
