import React, {useState} from 'react'
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

type Props = {
    value: string
    onChangeText(password: string): void
    placeholder?: string
}

const PasswordInput: React.FC<Props> = (props) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(true)

    return <View style={styles.container}>
        <TextInput
            style={styles.input}
            secureTextEntry={isPasswordVisible}
            placeholder={props.placeholder}
            value={props.value}
            onChangeText={props.onChangeText}
        />
        <TouchableOpacity onPress={() => setIsPasswordVisible(prev => !prev)}>
            <Ionicons name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'} size={22} color={'#00000066'}/>
        </TouchableOpacity>
    </View>
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
    },

    input: {
        flex: 1,
    },
})

export default PasswordInput