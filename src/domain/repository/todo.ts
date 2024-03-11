import { TodoModel } from "../models/todo";

export default interface TodoRepository {
    getList(): Promise<TodoModel.Response.List>
    createTodo(): Promise<Boolean>
    removeTables(): Promise<Boolean>
    removeTodo(data:TodoModel.Request.DeleteTodo): Promise<void>
    updateTodo(data:TodoModel.Request.UpdateTodo): Promise<Boolean>
}