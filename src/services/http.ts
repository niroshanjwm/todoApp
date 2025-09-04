import axios, { AxiosInstance, AxiosResponse } from "axios";
import { AuthenticationResponse, Todo } from "../types";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "http://localhost:8080/",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers!["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const getTodos = (): Promise<AxiosResponse<Todo[]>> =>
  axiosInstance.get<Todo[]>("/todo");

export const completedTodoById = (id: number, completed: boolean) =>
  axiosInstance.patch(`/todo/${id}`, { completed });

export const getTodoById = (id: string) => axiosInstance.get(`/todo/${id}`);

export const addTodo = (todo: string): Promise<AxiosResponse<Todo>> =>
  axiosInstance.post(`/todo`, { todo, userId: 1 });

export const removeTodo = (id: number) => axiosInstance.delete(`/todo/${id}`);

export const authentication = (
  username: string,
  password: string
): Promise<AxiosResponse<AuthenticationResponse>> =>
  axiosInstance.post(`/authentication/login`, { username, password });
