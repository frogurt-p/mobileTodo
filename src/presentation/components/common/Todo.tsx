import React from "react";
import { StyleProp, Text, TextStyle, View, ViewStyle } from "react-native"
import getDarkScheme from "../../../utils/getDarkScheme";
import colorScheme from "../../../utils/colorScheme";
import TodoCheckbox from "./TodoCheckbox";

export type todoObject = {
    id?:string;
    checked:boolean;
    description: string;
}

export type todoProps = {
    id?:string;
    title: string;
    todos: todoObject[] | [];
    createdDate:string;
}



const TodoComponent = ({title, todos, createdDate}:todoProps) => {
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
            {todos.map((item) => {
                return <TodoCheckbox key={item.id} checked={item.checked} description={item.description} />
            })}            
        </View>
    )
}

export default TodoComponent