import { NativeSyntheticEvent, TextInput, TextInputChangeEventData, TextInputProps, TextInputSubmitEditingEventData, TextStyle } from "react-native"
import getDarkScheme from "../../../utils/getDarkScheme";
import { forwardRef } from "react";

type InputTextComponentProps = {
    overrideColor?:string;
    value: string;
    onEnter: (e:NativeSyntheticEvent<TextInputSubmitEditingEventData>) => void;
    inputProps?: TextInputProps;
    // ref?: React.MutableRefObject<any>
} & TextStyle

type Ref = TextInput

const CustomTextInput = forwardRef<Ref, InputTextComponentProps>(({value, onEnter, overrideColor, inputProps, ...rest}:InputTextComponentProps, ref)=> {
    const color = getDarkScheme()
    return <TextInput
        ref={ref}
        defaultValue={value}
        onSubmitEditing={onEnter}
        style={{fontFamily: 'Inter-Regular', color: overrideColor ? overrideColor : color.typographyColor, ...rest}}
        {...inputProps}
    />
})

export default CustomTextInput