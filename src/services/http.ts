import axios, { AxiosInstance } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "https://dummyjson.com/",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getTodos = () => axiosInstance.get("/todos");

export const getTodoById = (id: string) => axiosInstance.get(`/todos/${id}`);

export const addTodo = (todo: {
  todo: string;
  completed: boolean;
  userId: number;
}) => axiosInstance.post(`/todos/add`, todo);
