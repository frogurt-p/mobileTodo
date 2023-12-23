export namespace TodoModel {
    export namespace Request {

    }

    export namespace Response {
        export interface ListData {
            todoId:number;
            createdDate:string;
            title:string;
        }
        
        export interface List extends Array<ListData> {}
    }
}