import { plainToClass } from 'class-transformer';
import { TodoDocument } from './schemas/todo.schemas';
import { TodoDto } from './dto/todo.dto';

function transformTodoDto(todo: TodoDocument): TodoDto {
  return plainToClass(TodoDto, todo.toJSON());
}
