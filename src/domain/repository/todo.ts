import { TodoModel } from "../models/todo";

export default interface TodoRepository {
    getList(): Promise<TodoModel.Response.List>
    createTodo(): Promise<Boolean>
}