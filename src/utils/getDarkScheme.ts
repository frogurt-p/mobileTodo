import { useColorScheme } from "react-native"
import colorScheme from "./colorScheme"




const getDarkScheme = () => {
    const currentColorScheme = useColorScheme() === 'dark'
    const typographyColor = currentColorScheme ? colorScheme.darkTypography : colorScheme.lightTypography
    const backgroundColor = currentColorScheme ? colorScheme.darkBackground : colorScheme.lightBackground

    return {
        currentColorScheme,
        typographyColor,
        backgroundColor

    }

}

export default getDarkScheme