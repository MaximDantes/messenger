import {StyleProp, TextStyle} from 'react-native'
import React from 'react'
import FormikField from './FormikField'

type Props = {
    value: string
    placeholder?: string
    error?: string
    style?: StyleProp<TextStyle>
    onChangeText(text: string): void
}

const FormikPhoneField: React.FC<Props> = (props) => {
    return <FormikField
        value={props.value}
        onChangeText={props.onChangeText}
        error={props.error}
        style={props.style}
        placeholder={props.placeholder}
        keyboardType={'phone-pad'}
    />
}

export default FormikPhoneField