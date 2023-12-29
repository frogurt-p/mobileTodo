import { StyleProp, Text, View, ViewStyle } from "react-native";
import getDarkScheme from "../../../utils/getDarkScheme";
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import colorScheme from "../../../utils/colorScheme";
type CheckmarkProps = {
    checked:boolean;
}

const style: StyleProp<ViewStyle> = {
    display: 'flex',
    flexDirection: 'row'
}

const TodoCheckbox = ({checked}:CheckmarkProps) => {
    const {typographyColor, backgroundColor} = getDarkScheme()
    const [checkboxChecked, setCheckboxChecked] = useState(checked)

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
                isChecked={checkboxChecked}
            />
        </View>
    )
}

export default TodoCheckbox