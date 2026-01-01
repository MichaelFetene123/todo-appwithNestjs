export class CreateTodoDto {
  readonly title: string;
  readonly description: string;
}

export class TodoDto extends CreateTodoDto {
 readonly id: number;
 readonly completed: boolean;
}
