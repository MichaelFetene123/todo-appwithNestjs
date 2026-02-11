import { Expose, Exclude } from 'class-transformer';
import {IsString, IsNotEmpty, IsOptional } from 'class-validator';


@Exclude()
export class TodoDto  {

  @Expose({name: '_id'})
   id: string;

  @Expose()
    title: string;
    
  @Expose()
    description: string;  
    
  @Expose()
    completed: boolean;  
}

@Exclude()
export class CreateTodoDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  title: string;

  @Expose()
  @IsString()
  @IsOptional()
  description?: string;
}


@Exclude()
export class UpdateTodoDto {

  @Expose()
    title?: string;

  @Expose()
    description?: string;
    
  @Expose()
    completed?: boolean;  
}








// export class CreateTodoDto {
//   readonly title: string;
//   readonly description: string;
// }

// export class TodoDto extends CreateTodoDto {
//  readonly id: string;
//  readonly completed: boolean;
// }

// export class UpdateTodoDto {
//   readonly title?: string;
//   readonly description?: string
//   readonly completed?: boolean;
// }