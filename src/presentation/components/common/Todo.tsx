import React from "react";
import { StyleProp, Text, TextStyle, View, ViewStyle } from "react-native"
import getDarkScheme from "../../../utils/getDarkScheme";
import TodoCheckbox from "./TodoCheckbox";
import { TodoModel } from "../../../domain/models/todo";

export interface TodoProps extends TodoModel.Response.ListData {

}



const TodoComponent = ({title, task, createdDate}:TodoProps) => {
    const {backgroundColor, typographyColor} = getDarkScheme()
    const todoStyle:StyleProp<ViewStyle> = {
        backgroundColor: backgroundColor,
        paddingHorizontal: 10,
        paddingVertical: 10
    }

    const textStyle:StyleProp<TextStyle> = {
        color: typographyColor,
        fontSize: 24
    }
    

    return (
        <View style={todoStyle}>
            <Text style={textStyle}>{title}</Text>
            {task.map((item) => {
                return <TodoCheckbox key={item.taskId} checked={item.taskChecked === 'true'} description={item.taskDescription} />
            })}            
        </View>
    )
}

export default TodoComponent