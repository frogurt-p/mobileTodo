export namespace TaskModel {
    export namespace Request {
        export interface Create {
            todoId:number;
        }

        export interface CheckUncheck {
            taskId:number;
            todoId:number;
            checked:'true' | 'false';
        }

        export interface Update {
            taskId:number;
            todoId:number;
            updateText:string;
        }
    }

    export namespace Response {
        
    }
}