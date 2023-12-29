import React from "react";
import { StyleProp, Text, TextStyle, View, ViewStyle } from "react-native"
import getDarkScheme from "../../../utils/getDarkScheme";
import TodoCheckbox from "./TodoCheckbox";
import { TodoModel } from "../../../domain/models/todo";
import CustomText from "./TextComponent";
import dayjs from "dayjs";
import IconButton from "./IconButton";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";

export interface TodoProps extends TodoModel.Response.ListData {

}



const TodoComponent = ({title, task, createdDate}:TodoProps) => {
    const {backgroundColor, typographyColor} = getDarkScheme()
    const todoStyle:StyleProp<ViewStyle> = {
        backgroundColor: backgroundColor,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderWidth: 1,
        borderStartColor: backgroundColor,
        borderEndColor: backgroundColor,
        borderColor: typographyColor
    }

    const textStyle:StyleProp<TextStyle> = {
        fontSize: 24
    }
    

    return (
        <View style={todoStyle}>
            <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                <CustomText label={title} {...textStyle} /> 
                <IconButton icon={<FontAwesomeIcon icon={faPencil} size={20} color={typographyColor}/>} onClick={()=>console.log('asd')} />
            </View>
            
            <CustomText label={dayjs().toString()} fontFamily="Inter-ExtraLight" paddingBottom={10} />
            {task.map((item) => {
                return (
                    <View key={item.taskId} style={{flexDirection:'row', alignItems:'center', gap:10}}>
                        <TodoCheckbox checked={item.taskChecked === 'true'}/>
                        <CustomText label={item.taskDescription} fontFamily="Inter-Light" textDecorationLine={item.taskChecked === 'true' ? 'line-through' : 'none'} />
                    </View>
                )
            })}            
        </View>
    )
}

export default TodoComponent