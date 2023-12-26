import { Text, TextStyle } from "react-native";
import getDarkScheme from "../../../utils/getDarkScheme";


type TextComponentProps = {
    label:string;
    overrideColor?:string;
} & TextStyle

const CustomText = ({label, overrideColor, ...rest}:TextComponentProps) => {
    const color = getDarkScheme()
    return <Text style={{color: overrideColor ? overrideColor : color.typographyColor, ...rest}}>{label}</Text>

}

export default CustomText