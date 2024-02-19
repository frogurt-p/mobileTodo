import { TodoModel } from "../models/todo";
import TodoRepository from "../repository/todo";



export default class TodoUsecase implements TodoRepository {
    constructor(private repository: TodoRepository) {}

    getList(): Promise<TodoModel.Response.List> {
        return this.repository.getList()
    }

    createTodo(): Promise<Boolean> {
        return this.repository.createTodo()
    }

    removeTables(): Promise<Boolean> {
        return this.repository.removeTables()
    }

    removeTodo(data: TodoModel.Request.DeleteTodo): Promise<void> {
        return this.repository.removeTodo(data)
    }

}