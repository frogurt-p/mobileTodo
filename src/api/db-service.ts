import { ResultSet, SQLiteDatabase, enablePromise, openDatabase } from "react-native-sqlite-storage";
import { TodoModel } from "../domain/models/todo";
import dayjs from "dayjs";
import { TaskModel } from "../domain/models/task";

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
        
        const curDate = dayjs().format('YYYY-MM-DD HH:mm:ss')
        const createTable = await db.executeSql(`INSERT INTO todo VALUES(${currentId}, '${curDate}', 'New Todo')`)
        const createTask = await db.executeSql(`INSERT INTO task VALUES(1, ${currentId}, 'New Task', 'false')`)

        return (createTable[0].rowsAffected >= 1 && createTask[0].rowsAffected >= 1) ? true : false

    } catch (error) {
        console.error(error)
        throw new Error('Failed creating todo')
    }
}

export const updateTodo = async (db:SQLiteDatabase, {title, todoId}:TodoModel.Request.UpdateTodo): Promise<Boolean> => {
    try {   
        const updateTodo = await db.executeSql(`UPDATE todo SET title = '${title}' WHERE todoId = ${todoId} `)
        return true
    } catch (error) {
        console.error(error)
        throw new Error('Failed updating todo')
    }
}

export const createTask = async (db:SQLiteDatabase, {todoId}:TaskModel.Request.Create): Promise<void> => {
    try {
        let currentId = 1
        const latestTaskId = await db.executeSql(`SELECT MAX(taskId) AS latestId FROM task WHERE todoId = ${todoId}`)
        if(latestTaskId[0].rows.item(0).latestId) {
            currentId = Number(latestTaskId[0].rows.item(0).latestId) + 1
        }
        await db.executeSql(`INSERT INTO task VALUES(${currentId}, ${todoId}, 'New Task', 'false')`)
    } catch (error) {
        console.error(error)
        throw new Error('Failed creating task')
    }
}

export const checkUncheckTask = async (db:SQLiteDatabase, {checked, taskId, todoId}:TaskModel.Request.CheckUncheck): Promise<void> => {
    try {
        await db.executeSql(`UPDATE task SET taskChecked = '${checked}' WHERE taskId = ${taskId} AND todoId = ${todoId}`)
    } catch (error) {
        console.error(error)
        throw new Error('Failed updating task')
    }
}

export const updateTask = async (db:SQLiteDatabase, {taskId, todoId, updateText}:TaskModel.Request.Update) => {
    try {
        await db.executeSql(`UPDATE task SET taskDescription = '${updateText}' WHERE taskId = ${taskId} AND todoId = ${todoId}`)
    } catch (error) {
        console.error(error)
        throw new Error('Failed updating task description')
    }
}

export const deleteTodo = async (db:SQLiteDatabase, {todoId}:TodoModel.Request.DeleteTodo) => {
    try {
        await db.executeSql(`DELETE FROM todo WHERE todoId=${todoId}`)
        await db.executeSql(`DELETE FROM task WHERE todoId=${todoId}`)
    } catch (error) {
        console.error(error)
        throw new Error('Failed deleting todos')
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