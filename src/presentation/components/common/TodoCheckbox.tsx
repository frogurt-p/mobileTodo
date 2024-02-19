import { StyleProp, Text, View, ViewStyle } from "react-native";
import getDarkScheme from "../../../utils/getDarkScheme";
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
type CheckmarkProps = {
    checked:boolean;
    onPress: (data:boolean) => void;
}

const style: StyleProp<ViewStyle> = {
    display: 'flex',
    flexDirection: 'row'
}

const TodoCheckbox = ({checked, onPress}:CheckmarkProps) => {
    const {typographyColor, backgroundColor} = getDarkScheme()
    return (
        <View style={style}>
            <BouncyCheckbox
                size={30}
                fillColor={typographyColor}
                iconComponent={<FontAwesomeIcon icon={faCheck} color={backgroundColor} />}
                innerIconStyle={{borderRadius: 10}}
                iconStyle={{borderRadius:10}}
                disableText={true}
                textStyle={{color:typographyColor}}
                isChecked={checked}
                disableBuiltInState={true}      
                onPress={()=> onPress(checked) }
            />
        </View>
    )
}

export default TodoCheckbox