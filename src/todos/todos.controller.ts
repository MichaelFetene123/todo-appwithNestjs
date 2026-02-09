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
  ParseBoolPipe,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodoDto, UpdateTodoDto, CreateTodoDto } from './dto/todo.dto';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  async findAll(@Query('showIncomplete') showIncomplete?: boolean) {
    const todos = await this.todosService.findAll(showIncomplete);
    return todos;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const todo = await this.todosService.findOne(id);

    if (!todo) {
      throw new NotFoundException(`Todo with id "${id}" not found`);
    }

    return todo;
  }

  
    @Post()
   async create(@Body() todo: CreateTodoDto) {
      const newTodo = await  this.todosService.createTodo(todo);
      return newTodo;
    }

    @Put(':id')
   async update(
      @Param('id') id: string,
  
      @Body() todo: UpdateTodoDto,
    ) {
      const updatedTodo = await this.todosService.updateTodo(id, todo);
      if (!updatedTodo) {
        throw new NotFoundException(`Todo with id "${id}" not found`);
      }
      return updatedTodo;
    }
    
  @Put(':id/complete')
  async  complete(@Param('id') id: string) {
    const completedTodo = await this.todosService.markTodoComplete(id);
    if (!completedTodo) {
      throw new NotFoundException(`Todo with id "${id}" not found`);
    }
    return completedTodo;
  }


  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.todosService.deleteTodo(id);
  }
}
