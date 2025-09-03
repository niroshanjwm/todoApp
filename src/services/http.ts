import axios, { AxiosInstance, AxiosResponse } from "axios";
import { Todo, TodoResponse } from "../types";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "https://dummyjson.com/",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getTodos = (): Promise<AxiosResponse<TodoResponse>> =>
  axiosInstance.get<TodoResponse>("/todos");

export const completedTodoById = (id: number, completed: boolean) =>
  axiosInstance.patch(`/todos/${id}`, { completed });

export const getTodoById = (id: string) => axiosInstance.get(`/todos/${id}`);

export const addTodo = (todo: Todo) => axiosInstance.post(`/todos/add`, todo);
