import { TaskModel } from "../models/task";

export default interface TaskRepo {
    createTask(data:TaskModel.Request.Create): Promise<void>
    checkUncheckTask(data:TaskModel.Request.CheckUncheck): Promise<void>
}

