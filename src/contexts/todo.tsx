import { isAxiosError } from "axios";
import React, { createContext, useEffect, useMemo, useState } from "react";
import { completedTodoById, getTodos } from "../services/http";
import { Todo, TodoContextType } from "../types";

export const TodoContext = createContext<TodoContextType>({
  todos: [],
  loading: false,
  error: "",
});

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingTodo, setLoadingTodo] = useState<number | undefined>(undefined);
  const [error, setError] = useState<string>("");

  const toggleTodoComplete = async (id: number, isCompleted: boolean) => {
    try {
      setLoadingTodo(id);
      await completedTodoById(id, isCompleted);
      setTodos((previousTodos) =>
        previousTodos.map((todo) => ({
          ...todo,
          completed: todo.id === id ? isCompleted : todo.completed,
        }))
      );
    } catch (error) {
      if (isAxiosError(error)) {
        setError(error.message);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoadingTodo(undefined);
    }
  };

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const todo = await getTodos();
      setTodos(todo.data.todos);
    } catch (error) {
      if (isAxiosError(error)) {
        setError(error.message);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const value = useMemo(
    () => ({
      todos,
      loading,
      loadingTodo,
      error,
      fetchTodos,
      toggleTodoComplete,
    }),
    [todos, loading, loadingTodo, error]
  );

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
