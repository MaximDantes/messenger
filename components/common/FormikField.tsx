import React, {useState} from 'react'
import {
    KeyboardTypeOptions,
    StyleProp,
    StyleSheet,
    Text,
    TextInput,
    TextStyle,
    TouchableOpacity,
    View
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

type Props = {
    value: string
    placeholder?: string
    error?: string
    style?: StyleProp<TextStyle>
    keyboardType?: KeyboardTypeOptions
    multiline?: boolean
    numberOfLines?: number
    onChangeText(text: string): void
    password?: boolean
    disableCapitalize?: boolean
}

const FormikField: React.FC<Props> = ({error, style, ...props}) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(!props.password)

    return <View>
        <View style={[styles.inputContainer, !!error && styles.errorInput]}>
            <TextInput
                secureTextEntry={!isPasswordVisible}
                {...props}
                style={[styles.input, style]}
                autoCapitalize={props.disableCapitalize ? 'none' : props.password ? 'none' : undefined}
            />

            {props.password &&
                <TouchableOpacity onPress={() => setIsPasswordVisible(prev => !prev)}>
                    <Ionicons name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'} size={22}
                              color={'#00000066'}/>
                </TouchableOpacity>}
        </View>

        {!!error && <Text style={styles.errorText}>{error}</Text>}
    </View>
}

const styles = StyleSheet.create({
    inputContainer: {
        // width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 3,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#66666688',
        paddingHorizontal: 13,
        paddingVertical: 3,
        backgroundColor: '#d7e9ff33'
    },

    input: {
        flex: 1,
    },

    errorText: {
        color: '#f00',
    },

    errorInput: {
        borderColor: '#f00'
    },
})

export default FormikField