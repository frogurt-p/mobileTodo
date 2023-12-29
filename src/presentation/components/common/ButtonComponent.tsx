import { StyleProp, Text, TextStyle, TouchableOpacity, View, ViewStyle, useColorScheme } from "react-native"
import getDarkScheme from "../../../utils/getDarkScheme";
import CustomText from "./TextComponent";


const buttonStyle:StyleProp<ViewStyle> = {
    height: 100,
    width: 100,
    justifyContent:'center',
    alignItems:'center',
    borderRadius: 20
}

type ButtonProps = {
    label:string;
    onClick: ()=> void;
    overrideButtonStyle?: ViewStyle;
    textStyle?: TextStyle;
}
 
const ButtonComponent = ({label, onClick, overrideButtonStyle, textStyle}:ButtonProps) => {
    const {typographyColor, backgroundColor} = getDarkScheme()
    return (
    <TouchableOpacity onPress={onClick}>
        <View style={{...buttonStyle, backgroundColor: typographyColor, ...overrideButtonStyle}} >
            <CustomText color={backgroundColor} {...textStyle} label={label} />    
        </View>
    </TouchableOpacity>
    )

}

export default ButtonComponent