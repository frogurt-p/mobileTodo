import { useEffect } from "react"
import TodoAPI from "../../../domain/infrastructure/api/todo"
import TodoUsecase from "../../../domain/usecase/todo"
import { todoObject, todoProps } from "../../components/common/Todo"




const mainViewmodel = () => {

    const repo = new TodoUsecase(new TodoAPI())
    
    useEffect(()=> {
        createFunction()
    },[])

    const createFunction = async () => {
        const getTodo = await repo.getList()
        console.log(getTodo)
    }

    const todo:todoProps[] = [
        {
            id: '1',
            createdDate: 'now',
            title: 'Todo1',
            todos: [
                {
                    id: '1',
                    checked: false,
                    description: 'asd'
                }
            ]
        },
        {
            id: '2',
            createdDate: 'now',
            title: 'Todo2',
            todos: [
                {
                    id: '2',
                    checked: true,
                    description: 'asd2'
                }
            ]
        }
    ]

    return {
        todo
    }

}

export default mainViewmodel
export type MainViewmodelType = ReturnType<typeof mainViewmodel>