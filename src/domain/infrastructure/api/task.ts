import { checkUncheckTask, createTable, createTask, getDBConnection } from "../../../api/db-service";
import { TaskModel } from "../../models/task";
import TaskRepo from "../../repository/task";



export default class TaskAPI implements TaskRepo {
    async createTask({todoId}: TaskModel.Request.Create): Promise<void> {
        const db = await getDBConnection()        
        try {   
            await createTable(db)
            return await createTask(db, {todoId})
        } catch (error:any) {
            console.error(error)
            throw new Error(error || 'Unknown Error')
        }
    }

    async checkUncheckTask(data: TaskModel.Request.CheckUncheck): Promise<void> {
        const db = await getDBConnection()
        try {
            const newStatus = data.checked === 'true' ? 'false' : 'true'
            return await checkUncheckTask(db, {...data, checked: newStatus})
        } catch (error:any) {
            console.error(error)
            throw new Error(error || 'Unknown Error')
        }    
    }
}