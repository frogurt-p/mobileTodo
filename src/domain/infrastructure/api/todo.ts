import { createTable, createTodo, getDBConnection, getTodo } from "../../../api/db-service";
import { TodoModel } from "../../models/todo";
import TodoRepository from "../../repository/todo";



export default class TodoAPI implements TodoRepository {
    async getList(): Promise<TodoModel.Response.List> {
        const db = await getDBConnection()
        try {
            await createTable(db)
            return await getTodo(db)
        } catch (error:any) {
            throw new Error(error || 'Unknown Error')
        }
    }

    async createTodo(): Promise<Boolean> {
        const db = await getDBConnection()
        try {
            await createTable(db)
            return await createTodo(db)
        } catch (error:any) {
            throw new Error(error || 'Unknown Error')
        }
    }
}