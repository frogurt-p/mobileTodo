import { Animated, Dimensions, Text, TouchableHighlight, TouchableWithoutFeedback, View } from "react-native"
import CustomText from "./TextComponent"
import IconButton from "./IconButton"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import colorScheme from "../../../utils/colorScheme"


type HoldButtonComponentType = {
    onClick: ()=> void;
}

const HoldButtonComponent = ({onClick}:HoldButtonComponentType) => { 
    return (
        <View style={{flexBasis:100, flexGrow:1, justifyContent:'center', alignItems:'center', gap:30}}>
            <IconButton icon={<FontAwesomeIcon size={50} icon={faTrash} style={{color:colorScheme.error}}/>} 
                        onClick={onClick}
                        style={{height: 100, width: 100}} />
            <CustomText label="Press the button to delete" />
        </View>
    )
}


export default HoldButtonComponent