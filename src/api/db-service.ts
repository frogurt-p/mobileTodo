import { SQLiteDatabase, enablePromise, openDatabase } from "react-native-sqlite-storage";
import { TodoModel } from "../domain/models/todo";
import dayjs from "dayjs";

enablePromise(true)

export const getDBConnection = async () => {
    return openDatabase({name : "todo.db", location: 'default'})
}

export const createTable = async (db:SQLiteDatabase) => {
    const todoTableQuery = `
    CREATE TABLE IF NOT EXISTS todo (
       todoId INTEGER PRIMARY KEY UNIQUE,
       createdDate TEXT NOT NULL,
       title TEXT NOT NULL
    );`

    const taskTableQuery = `
    CREATE TABLE IF NOT EXISTS task (
        taskId TEXT PRIMARY KEY UNIQUE,
        todoId TEXT NOT NULL,
        taskDescription TEXT NOT NULL,
        taskChecked TEXT,
        FOREIGN KEY (todoId)
            REFERENCES todo(todoId)
            ON DELETE CASCADE
            ON UPDATE NO ACTION
    );`

    await db.executeSql(todoTableQuery)
    await db.executeSql(taskTableQuery)
}

export const getTodo = async (db:SQLiteDatabase): Promise<TodoModel.Response.List> => {
    try {
        const todo: TodoModel.Response.List = []
        const results = await db.executeSql(`SELECT * FROM todo`);
        for (let index = 0; index < results[0].rows.length; index++) {
            todo.push(results[0].rows.item(index))
        }

        return todo
    } catch (error) {
        console.error(error)
        throw Error('Failed getting todo list')
    }
}

export const createTodo = async (db:SQLiteDatabase): Promise<Boolean> => {
    try {
        let currentId = 1
        const latestTableId = await db.executeSql(`SELECT MAX(todoId) AS latestId FROM todo`)
        if(latestTableId[0].rows.item(0).latestId) {
            currentId = Number(latestTableId[0].rows.item(0).latestId) + 1
        } 
        
        const curDate = dayjs().format('DD-MM-YYYY HH:mm:ss')
        const createTable = await db.executeSql(`INSERT INTO todo VALUES(${currentId}, '${curDate}', 'placeholder')`)
        
        return createTable[0].rowsAffected >= 1 ? true : false

    } catch (error) {
        console.error(error)
        throw new Error('Failed creating todo')
    }
}