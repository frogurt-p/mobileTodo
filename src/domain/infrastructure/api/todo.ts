import { createTable, createTodo, deleteTodo, getDBConnection, getTodo, nukeTables } from "../../../api/db-service";
import { TodoModel } from "../../models/todo";
import TodoRepository from "../../repository/todo";



export default class TodoAPI implements TodoRepository {
    async getList(): Promise<TodoModel.Response.List> {
        const db = await getDBConnection()
        try {
            await createTable(db)
            return await getTodo(db)
        } catch (error:any) {
            console.error(error)
            throw new Error(error || 'Unknown Error')
        }
    }
    
    async createTodo(): Promise<Boolean> {
        const db = await getDBConnection()
        try {
            await createTable(db)
            return await createTodo(db)
        } catch (error:any) {
            console.error(error)
            throw new Error(error || 'Unknown Error')
        }
    }
    
    async removeTables(): Promise<Boolean> {
        const db = await getDBConnection()
        try {
            await createTable(db)
            return await nukeTables(db)
        } catch (error:any) {
            console.error(error)
            throw new Error(error || 'Unknown Error')
        }    
    }

    async removeTodo(data: TodoModel.Request.DeleteTodo): Promise<void> {
        const db = await getDBConnection()
        try {
            await deleteTodo(db, {todoId: data.todoId})
        } catch (error:any) {
            console.error(error)
            throw new Error(error || 'Unknown Error')
        }    
    }
}