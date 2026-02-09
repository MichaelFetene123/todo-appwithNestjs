export class CreateTodoDto {
  readonly title: string;
  readonly description: string;
}

export class TodoDto extends CreateTodoDto {
 readonly id: string;
 readonly completed: boolean;
}

export class UpdateTodoDto {
  readonly title?: string;
  readonly description?: string
  readonly completed?: boolean;
}