import { useEffect } from "react"
import TodoAPI from "../../../domain/infrastructure/api/todo"
import TodoUsecase from "../../../domain/usecase/todo"
import { useMutation, useQuery } from "@tanstack/react-query"




const mainViewmodel = () => {

    const repo = new TodoUsecase(new TodoAPI())
    
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

    console.log(data)

    return {
        data: data || [],
        createTask,
        isLoading
    }

}

export default mainViewmodel
export type MainViewmodelType = ReturnType<typeof mainViewmodel>