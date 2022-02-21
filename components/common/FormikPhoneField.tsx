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
    const onChangeText = (text: string) => {
        if (text.length === 2) {
            props.onChangeText(`(${text}) `)
            return
        }

        if (text.length === 8) {
            props.onChangeText(`${text} `)
            return
        }

        if (text.length === 11) {
            props.onChangeText(`${text} `)
            return
        }

        if (text.length > 14) {
            return
        }

        props.onChangeText(text)
    }

    return <FormikField
        value={props.value}
        onChangeText={onChangeText}
        error={props.error}
        style={props.style}
        placeholder={props.placeholder}
        keyboardType={'phone-pad'}
    />
}

export default FormikPhoneField