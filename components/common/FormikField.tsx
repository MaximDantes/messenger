import React from 'react'
import {KeyboardTypeOptions, StyleProp, StyleSheet, Text, TextInput, TextStyle, View} from 'react-native'

type Props = {
    value: string
    placeholder?: string
    error?: string
    style?: StyleProp<TextStyle>
    keyboardType?: KeyboardTypeOptions
    onChangeText(text: string): void
}

const FormikField: React.FC<Props> = (props) => {
    return <View>
        <TextInput
            value={props.value}
            onChangeText={props.onChangeText}
            placeholder={props.placeholder}
            style={[styles.input, props.style, !!props.error && styles.errorInput]}
            keyboardType={props.keyboardType}
        />
        {!!props.error && <Text style={styles.errorText}>{props.error}</Text>}
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