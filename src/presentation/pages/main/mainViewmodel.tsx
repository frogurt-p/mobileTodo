import { useEffect } from "react"
import TodoAPI from "../../../domain/infrastructure/api/todo"
import TodoUsecase from "../../../domain/usecase/todo"
import { useMutation, useQuery } from "@tanstack/react-query"
import TaskUsecase from "../../../domain/usecase/task"
import TaskAPI from "../../../domain/infrastructure/api/task"
import { TaskModel } from "../../../domain/models/task"
import { TodoModel } from "../../../domain/models/todo"




const mainViewmodel = () => {

    const repo = new TodoUsecase(new TodoAPI())
    const taskRepo = new TaskUsecase(new TaskAPI())

    const {data, isLoading, refetch} = useQuery({
        queryKey: ['todo'],
        queryFn: ()=> repo.getList()
    })

    const {mutate:createTask} = useMutation({
        mutationFn: ()=> repo.createTodo(),
        onSuccess: ()=> {
            refetch()
        }
    })

    const {mutate:deleteTask} = useMutation({
        mutationFn: ()=> repo.removeTables()
    })

    const {mutate:createSubTask} = useMutation({
        mutationFn: (data:TaskModel.Request.Create)=> taskRepo.createTask(data),
        onSuccess: () => {
            refetch()
        }
    })

    const {mutate: checkUncheckTask} = useMutation({
        mutationFn: (data:TaskModel.Request.CheckUncheck) => taskRepo.checkUncheckTask(data),
        onSuccess: () => {
            refetch()
        }
    })

    const {mutate: deleteTodo} = useMutation({
        mutationFn: (data:TodoModel.Request.DeleteTodo) => repo.removeTodo(data),
        onSuccess: () => {
            refetch()
        }
    })

    return {
        data: data || [],
        createTask,
        createSubTask,
        checkUncheckTask,
        deleteTodo,
        isLoading
    }

}

export default mainViewmodel
export type MainViewmodelType = ReturnType<typeof mainViewmodel>