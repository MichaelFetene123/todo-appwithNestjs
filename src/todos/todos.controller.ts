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
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodoDto, UpdateTodoDto, CreateTodoDto } from './dto/todo.dto';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  findAll(@Query('showIncomplete') showIncomplete: boolean): TodoDto[] {
    return this.todosService.findAll(showIncomplete);
  }

  @Get(':id')
  findOne(@Param('id') id: string): TodoDto {
    const todo = this.todosService.findOne(+id);

    if (!todo) {
      throw new NotFoundException(`Todo with id "${id}" not found`);
    }

    return todo;
  }

  @Post()
  create(@Body() todo: CreateTodoDto): TodoDto {
return this.todosService.create(todo);
  }

@Put(':id/')
  update(@Param('id') id: string,

   @Body() todo: UpdateTodoDto) :TodoDto | null {
    const updatedTodo = this.todosService.update(+id, todo);
    if(!updatedTodo){
      throw new NotFoundException(`Todo with id "${id}" not found`);
    }
    return updatedTodo;
  }

  @Put(':id/completed')
   complete(@Param('id') id: string): TodoDto {
    const updatedTodo = this.todosService.markTodoCompleted(+id);
    if(!updatedTodo){
      throw new NotFoundException(`Todo with id "${id}" not found`);
    }
    return updatedTodo;
  }

  @Delete(':id')
  remove(@Param('id' ) id: string) {
    return this.todosService.remove(+id);
  }

}
