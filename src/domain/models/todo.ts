export namespace TodoModel {
    export namespace Request {

    }

    export namespace Response {

        export interface TaskData {
            taskId:number;
            todoId:number;
            taskDescription:string;
            taskChecked:string;

        }
        export interface ListData {
            todoId:number;
            createdDate:string;
            title:string;
            task:TaskData[];
        }
        
        export interface List extends Array<ListData> {}
    }
}