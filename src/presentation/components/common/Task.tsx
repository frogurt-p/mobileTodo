import { Pressable, TextInput, View } from "react-native"
import { TodoModel } from "../../../domain/models/todo"
import TodoCheckbox from "./TodoCheckbox"
import CustomTextInput from "./TextInputComponent"
import getDarkScheme from "../../../utils/getDarkScheme"
import React, { useRef, useState } from "react"
import CustomText from "./TextComponent"

type TaskProps = {
    item:TodoModel.Response.TaskData;
    onCheckUncheck: (data:boolean, taskId:number) => void;
    onUpdate: (textDescription:string, taskId:number) => void;
}


const Task = ({item, onCheckUncheck, onUpdate}:TaskProps) => {
    const {backgroundColor, typographyColor} = getDarkScheme()
    const inputRef = useRef<TextInput | null>(null)
    const [editable, setEditable] = useState(false)

    return (
    <View>
        <View key={item.taskId} style={{flexDirection:'row', alignItems:'center', gap:10}}>
            <TodoCheckbox checked={item.taskChecked === 'true' ? true : false} onPress={(data)=>onCheckUncheck(data, item.taskId)}/>
            <View style={{borderRadius: 10, margin: 2.5, flex:1, backgroundColor: backgroundColor}}>
                <Pressable 
                android_ripple={{color: typographyColor, borderless: true, foreground: false}}
                onLongPress={()=> setEditable(true) }
                >
                        { !editable && <CustomText label={item.taskDescription} textDecorationLine={item.taskChecked === 'true' ? 'line-through' : "none"} fontFamily="Inter-Light" />}
                        { editable &&
                            <CustomTextInput 
                            ref={inputRef} 
                            inputProps={{
                                autoFocus:true,
                                multiline: true,
                                onEndEditing: (e)=> {
                                    setEditable(false)
                                    onUpdate(e.nativeEvent.text, item.taskId)
                                },
                                }} 
                                    value={item.taskDescription} 
                                    onEnter={(text)=>console.log(text)} 
                                    textDecorationLine={item.taskChecked === 'true' ? 'line-through' : "none"} 
                                    fontFamily="Inter-Light"
                            />
                        }
                </Pressable>
            </View>
        </View>
        { editable && <CustomText paddingLeft={45} label="Editing..."  fontSize={12} />}
    </View>
    )

}

export default Task