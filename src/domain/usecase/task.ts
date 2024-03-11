import { TaskModel } from "../models/task";
import TaskRepo from "../repository/task";


export default class TaskUsecase implements TaskRepo {
    constructor(private repo:TaskRepo) {}
    
    async createTask(data: TaskModel.Request.Create): Promise<void> {
        return this.repo.createTask(data)    
    }

    async checkUncheckTask(data: TaskModel.Request.CheckUncheck): Promise<void> {
        return this.repo.checkUncheckTask(data)    
    }

    async updateTaskDescription(data: TaskModel.Request.Update): Promise<void> {
        return this.repo.updateTaskDescription(data)    
    }
}