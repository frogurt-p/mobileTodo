import { StyleProp, Text, TouchableOpacity, View, ViewStyle } from "react-native"


const buttonStyle:StyleProp<ViewStyle> = {
    height: 100,
    width: 100,
    // flex: 1,
    backgroundColor: 'green',
    justifyContent:'center',
    alignItems:'center'
}

type ButtonProps = {
    label:string;
    onClick: ()=> void;
} & ViewStyle
 
const ButtonComponent = ({label, onClick, ...rest}:ButtonProps) => {

    return (
    <TouchableOpacity onPress={onClick}>
        <View style={{...buttonStyle, ...rest}} >
            <Text>{label}</Text>    
        </View>
    </TouchableOpacity>
    )

}

export default ButtonComponent