import { Text, View } from "react-native"
import IconButton from "./IconButton"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faAdd } from "@fortawesome/free-solid-svg-icons"
import getDarkScheme from "../../../utils/getDarkScheme"


type AppHeaderType = {
    addTodo: () => void;
}

const AppHeader = ({addTodo}:AppHeaderType) => {

    const {typographyColor} = getDarkScheme()

    return (
        <View style={{justifyContent:'space-between', flexDirection:'row', paddingHorizontal:15}}>
            <Text style={{fontSize:32, color: typographyColor}}>
                MY todos
            </Text>
            <IconButton icon={<FontAwesomeIcon icon={faAdd} color={typographyColor}  />} onClick={addTodo} />
        </View>
    )
}

export default AppHeader