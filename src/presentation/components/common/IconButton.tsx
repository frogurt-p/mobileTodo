import { Pressable, ViewStyle } from "react-native"
import getDarkScheme from "../../../utils/getDarkScheme";


type IconComponentProps = {
    icon: JSX.Element
    onClick: ()=> void;
    style?: ViewStyle
}

const IconButton = ({icon, onClick, style}:IconComponentProps) => {
    const {typographyColor, backgroundColor} = getDarkScheme()
    return <Pressable 
    style={{justifyContent:'center', alignItems:'center', height:35, width: 35, borderRadius:15, ...style}} 
    onPress={onClick}
    android_ripple={{color:typographyColor, borderless:true}}>
        {icon}
    </Pressable>
}

export default IconButton