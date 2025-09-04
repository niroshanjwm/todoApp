export type Todo = {
  id?: number;
  todo: string;
  completed: boolean;
  userId: number;
};

export interface TodoResponse {
  todos: Todo[];
  total: number;
  skip: number;
  limit: number;
}

export type TodoContextType = {
  todos: Todo[];
  loading: boolean;
  loadingTodo?: number;
  error: string;
  addTodo?: (text: string) => Promise<void>;
  deleteTodo?: (id: number) => Promise<void>;
  fetchTodos?: () => Promise<void>;
  toggleTodoComplete?: (todoId: number, isCompleted: boolean) => Promise<void>;
};

export type AuthenticationResponse = {
  accessToken: string;
};
