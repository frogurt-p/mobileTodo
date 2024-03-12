import { StyleSheet, View } from "react-native";
import ReactNativeModal from "react-native-modal";
import CustomText from "./TextComponent";
import getDarkScheme from "../../../utils/getDarkScheme";
import colorScheme from "../../../utils/colorScheme";
import IconButton from "./IconButton";
import { faCross, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";


type ModalProps = {
    visible:boolean;
    children:React.ReactNode;
}

type ModalTitleProps = {
    title:string;
    onClose: () => void;
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ffffff",
        borderRadius: 25,
        borderWidth: 1,
        borderColor: "#000",
        borderStyle: "solid",
        height: 500,
        padding: 11,
        alignItems:'center',
        flexDirection: 'column',
      },
      title: {
        justifyContent:'center',
        alignItems:'center',
        flexDirection: 'row'
      }
})

export const ModalComponent = ({children, visible}:ModalProps) => {
    const color = getDarkScheme()
    return (
        <ReactNativeModal
        isVisible={visible}
    >
        <View style={{...styles.container, backgroundColor: color.backgroundColor, borderColor: colorScheme.lightBackground}}>
            {children}
        </View>
    </ReactNativeModal>
    )
    
}

const ModalComponentTitle = ({title, onClose}: ModalTitleProps) => {
    const color = getDarkScheme()
    return (
    <View style={styles.title}>
        <CustomText label={title} textAlign="center" fontSize={24} flexBasis={270} paddingLeft={30}/>
        <IconButton icon={<FontAwesomeIcon icon={faXmark} color={color.typographyColor} size={24}/>} onClick={onClose}/>
    </View>)
}

ModalComponent.Title = ModalComponentTitle