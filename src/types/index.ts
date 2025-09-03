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
  fetchTodos?: () => Promise<void>;
  toggleTodoComplete?: (todoId: number, isCompleted: boolean) => Promise<void>;
};
