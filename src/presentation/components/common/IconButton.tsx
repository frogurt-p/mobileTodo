import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { Pressable } from "react-native"
import getDarkScheme from "../../../utils/getDarkScheme";


type IconComponentProps = {
    icon: JSX.Element
    onClick: ()=> void;
}

const IconButton = ({icon, onClick}:IconComponentProps) => {
    const {typographyColor, backgroundColor} = getDarkScheme()
    return <Pressable 
    style={{justifyContent:'center', alignItems:'center', height:35, width: 35, borderRadius:15}} 
    onPress={onClick}
    android_ripple={{color:typographyColor, borderless:true}}>
        {icon}
    </Pressable>
}

export default IconButton