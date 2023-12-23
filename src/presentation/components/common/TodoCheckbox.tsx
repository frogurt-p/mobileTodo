import { StyleProp, Text, View, ViewStyle } from "react-native";
import getDarkScheme from "../../../utils/getDarkScheme";
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import colorScheme from "../../../utils/colorScheme";
type CheckmarkProps = {
    checked:boolean;
    description:string;
}

const style: StyleProp<ViewStyle> = {
    display: 'flex',
    flexDirection: 'row'
}

const TodoCheckbox = ({checked, description}:CheckmarkProps) => {
    const {typographyColor, backgroundColor} = getDarkScheme()
    const [checkboxChecked, setCheckboxChecked] = useState(checked)

    return (
        <View style={style}>
            <BouncyCheckbox
                size={25}
                fillColor={typographyColor}
                iconComponent={<FontAwesomeIcon icon={faCheck} color={backgroundColor} />}
                text={description}
                textStyle={{color:typographyColor}}
                isChecked={checkboxChecked}
            />
        </View>
    )
}

export default TodoCheckbox