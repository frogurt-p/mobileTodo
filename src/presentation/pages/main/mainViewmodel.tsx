import { useEffect, useState } from "react"
import TodoAPI from "../../../domain/infrastructure/api/todo"
import TodoUsecase from "../../../domain/usecase/todo"
import { useMutation, useQuery } from "@tanstack/react-query"
import TaskUsecase from "../../../domain/usecase/task"
import TaskAPI from "../../../domain/infrastructure/api/task"
import { TaskModel } from "../../../domain/models/task"
import { TodoModel } from "../../../domain/models/todo"

const mainViewmodel = () => {
    const [deleteModal, setDeleteModal] =  useState(false)
    const [currentDeleteTodo, setCurrentDeleteTodo] = useState(0)
    const repo = new TodoUsecase(new TodoAPI())
    const taskRepo = new TaskUsecase(new TaskAPI())

    const {data, isLoading, refetch} = useQuery({
        queryKey: ['todo'],
        queryFn: ()=> repo.getList()
    })

    console.log(data)

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
            setDeleteModal(false)
        }
    })

    const openModalDelete = ({todoId}: {todoId:number}) => {
        setDeleteModal(true)
        setCurrentDeleteTodo(todoId)
    }

    return {
        data: data || [],
        createTask,
        createSubTask,
        checkUncheckTask,
        deleteTodo,
        isLoading,
        deleteModal, setDeleteModal,
        currentDeleteTodo, setCurrentDeleteTodo,
        openModalDelete
    }

}

export default mainViewmodel
export type MainViewmodelType = ReturnType<typeof mainViewmodel>