import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  NotFoundException,
  Query,
  ValidationPipe,
  Request,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodoDto, UpdateTodoDto, CreateTodoDto } from './dto/todo.dto';
import { plainToClass } from 'class-transformer';
import { TodoDocument } from './schemas/todo.schemas';

function transformTodoDto(todo: TodoDocument): TodoDto {
  return plainToClass(TodoDto, todo.toJSON());
}

function userIdFromRequest(req: any): string {
  // The user should be set on the request object by the AuthGuard.
  // This information was embedded within the JWT token
  return req.user?.sub ?? '';
}

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  async findAll(
    @Request() req,
    @Query('showIncomplete') showIncomplete?: boolean,
  ): Promise<TodoDto[]> {
    const userId = userIdFromRequest(req);
    const todos = await this.todosService.findAll(userId, showIncomplete);
    return todos.map(transformTodoDto);
  }

  @Get(':id')
  async findOne(@Request() req, @Param('id') id: string): Promise<TodoDto> {
    const userId = userIdFromRequest(req);
    const todo = await this.todosService.findOne(userId, id);

    if (!todo) {
      throw new NotFoundException(`Todo with id "${id}" not found`);
    }

    return transformTodoDto(todo);
  }

  @Post()
  async create(
    @Request() req,
    @Body(new ValidationPipe()) todo: CreateTodoDto,
  ): Promise<TodoDto> {
    const userId = userIdFromRequest(req);
    const newTodo = await this.todosService.createTodo(userId, todo);
    return transformTodoDto(newTodo);
  }

  @Put(':id')
  async update(
    @Request() req,
    @Param('id') id: string,

    @Body() todo: UpdateTodoDto,
  ): Promise<TodoDto> {
    const userId = userIdFromRequest(req);
    const updatedTodo = await this.todosService.updateTodo(userId, id, todo);
    if (!updatedTodo) {
      throw new NotFoundException(`Todo with id "${id}" not found`);
    }
    
    return transformTodoDto(updatedTodo);
  }

  @Put(':id/complete')
  async complete(@Request() req, @Param('id') id: string): Promise<TodoDto> {
    const userId = userIdFromRequest(req);
    const completedTodo = await this.todosService.markTodoComplete(userId, id);
    if (!completedTodo) {
      throw new NotFoundException(`Todo with id "${id}" not found`);
    }
    return transformTodoDto(completedTodo);
  }

  @Delete(':id')
  async remove(@Request() req, @Param('id') id: string): Promise<void> {
    const userId = userIdFromRequest(req);
    await this.todosService.deleteTodo(userId, id);
    return;
  }
}
