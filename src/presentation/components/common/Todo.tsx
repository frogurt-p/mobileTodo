import React, { useState } from "react";
import { Dimensions, Pressable, StyleProp, TextStyle, Touchable, View, ViewStyle } from "react-native"
import getDarkScheme from "../../../utils/getDarkScheme";
import TodoCheckbox from "./TodoCheckbox";
import { TodoModel } from "../../../domain/models/todo";
import CustomText from "./TextComponent";
import dayjs from "dayjs";
import IconButton from "./IconButton";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronDown, faChevronUp, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import ButtonComponent from "./ButtonComponent";
import colorScheme from "../../../utils/colorScheme";
import { TaskModel } from "../../../domain/models/task";
import CustomTextInput from "./TextInputComponent";
import Task from "./Task";


export interface TodoProps extends TodoModel.Response.ListData {
    onCreateTask: () => void;
    onDeleteTodo: () => void;
    onCheckUncheck: (data:boolean, taskId:number) => void;
    onRenameTodo: (title:string) => void;
    onUpdate: (textDescription:string, taskId:number) => void;
}

const textStyle:StyleProp<TextStyle> = {
    fontSize: 24,
}

const actionButtonStyle: StyleProp<ViewStyle> = {
}
const TodoComponent = ({title, task, onCreateTask, onDeleteTodo, onCheckUncheck, onRenameTodo, createdDate, onUpdate}:TodoProps) => {
    const deviceWidth = Dimensions.get('window').width
    const {backgroundColor, typographyColor} = getDarkScheme()
    const [isAction, setIsAction] = useState(false)
    const todoStyle:StyleProp<ViewStyle> = {
        backgroundColor: backgroundColor,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderWidth: 1,
        borderStartColor: backgroundColor,
        borderEndColor: backgroundColor,
        borderColor: typographyColor,
    }

    return (
        <View style={todoStyle}>
            {/* <CustomText label={title} {...textStyle} />  */}
            <CustomTextInput value={title} onEnter={({nativeEvent})=>onRenameTodo(nativeEvent.text)} fontSize={24}/>
            <CustomText label={dayjs(createdDate).format('DD MMM YYYY HH:mm:ss')} fontFamily="Inter-ExtraLight" paddingBottom={10} />
            <View style={{gap: 10}}>
                {task.map((item) => {
                    return <Task key={item.taskId} item={item} onUpdate={onUpdate} onCheckUncheck={onCheckUncheck}/>
                })}

            </View>
            <View style={{alignItems:'center'}}>
                <IconButton icon={<FontAwesomeIcon icon={ isAction ? faChevronUp : faChevronDown} color={typographyColor}/>} onClick={()=> setIsAction((prevVal) => !prevVal)} />    
            </View>            
            <View style={{display: isAction ? 'flex' : 'none', flexDirection: 'row', justifyContent:'center', alignItems:'center', gap: 10}}>
                <ButtonComponent label="Delete" 
                                 onClick={onDeleteTodo} 
                                 overrideButtonStyle={{width: (deviceWidth/2) - 10, height: 50}} 
                                 icon={<FontAwesomeIcon icon={faTrash} style={{color: colorScheme.error}}/>} 
                                 textStyle={{color:colorScheme.error, fontFamily: 'Inter-Bold'}}
                                 />
                <ButtonComponent label="Add Task" 
                                 onClick={onCreateTask} 
                                 overrideButtonStyle={{width: (deviceWidth/2) - 10, height: 50}} 
                                 icon={<FontAwesomeIcon icon={faPlus} />}
                                 textStyle={{fontFamily:'Inter-Bold'}}
                                 />
            </View>
        </View>
    )
}

export default TodoComponent