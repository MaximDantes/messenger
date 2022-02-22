import React from 'react'
import {KeyboardTypeOptions, StyleProp, StyleSheet, Text, TextInput, TextStyle, View} from 'react-native'

type Props = {
    value: string
    placeholder?: string
    error?: string
    style?: StyleProp<TextStyle>
    keyboardType?: KeyboardTypeOptions
    multiline?: boolean
    numberOfLines?: number
    onChangeText(text: string): void
}

const FormikField: React.FC<Props> = ({error, style, ...props}) => {
    return <View>
        <TextInput
            {...props}
            style={[styles.input, style, !!error && styles.errorInput]}
        />
        {!!error && <Text style={styles.errorText}>{error}</Text>}
    </View>
}

const styles = StyleSheet.create({
    input: {
        borderRadius: 3,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#666666',
        paddingHorizontal: 10,
    },

    errorText: {
        color: '#f00',
    },

    errorInput: {
        borderColor: '#f00'
    },
})

export default FormikField