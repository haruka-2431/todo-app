export interface Todo {
  id: number;
  title: string;
  isCompleted: boolean;
}

export interface CreateTodoRequest {
  title: string;
}

export interface DeleteTodoResponse {
  message: string;
}