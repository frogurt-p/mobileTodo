import { ResultSet, SQLiteDatabase, enablePromise, openDatabase } from "react-native-sqlite-storage";
import { TodoModel } from "../domain/models/todo";
import dayjs from "dayjs";

enablePromise(true)

const getListData = <T>(result:[ResultSet]): Array<T> => {
    const data:T[] = []
    for (let index = 0; index < result[0].rows.length; index++) {
        data.push(result[0].rows.item(index))
    }
    return data
}

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
        taskId INTEGER NOT NULL,
        todoId INTEGER NOT NULL,
        taskDescription TEXT NOT NULL,
        taskChecked TEXT,
        PRIMARY KEY (taskId, todoId),
        FOREIGN KEY (todoId)
            REFERENCES todo(todoId)
            ON DELETE CASCADE
            ON UPDATE NO ACTION
    );`
    
    //Reset table
    // await db.executeSql(`DROP TABLE todo`)
    // await db.executeSql(`DROP TABLE task`)

    await db.executeSql(todoTableQuery)
    await db.executeSql(taskTableQuery)
}

export const getTodo = async (db:SQLiteDatabase): Promise<TodoModel.Response.List> => {
    try {
        const todo: TodoModel.Response.List = []
        const results = await db.executeSql(`SELECT * FROM todo`);
        for (let index = 0; index < results[0].rows.length; index++) {

            const todoResult = results[0].rows.item(index)
            const taskResults = await db.executeSql(`SELECT * FROM task WHERE todoid = ${todoResult.todoId}`)

            const taskData = getListData<TodoModel.Response.TaskData>(taskResults)
            
            const todoReturn = {
                ...todoResult,
                task: taskData
            }
            todo.push(todoReturn)
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
        const createTable = await db.executeSql(`INSERT INTO todo VALUES(${currentId}, '${curDate}', 'New Todo')`)
        const createTask = await db.executeSql(`INSERT INTO task VALUES(1, ${currentId}, 'New Task', 'false')`)

        return (createTable[0].rowsAffected >= 1 && createTask[0].rowsAffected >= 1) ? true : false

    } catch (error) {
        console.error(error)
        throw new Error('Failed creating todo')
    }
}

export const nukeTables = async (db:SQLiteDatabase): Promise<Boolean> => {
    try {
        await db.executeSql(`DELETE FROM todo`)
        await db.executeSql(`DELETE FROM task`)
        return true
    } catch (error) {
        console.error(error)
        throw new Error('Failed truncating tables')
    }
}