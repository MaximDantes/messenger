import React, {useState} from 'react'
import {Button, StyleSheet, TextInput, View} from 'react-native'
import {screenStyles} from '../styles/common'
import {useDispatch} from 'react-redux'
import {auth} from '../store/auth/auth-thunks'
import {ScreenProps} from '../types/screens'

const AuthScreen: React.FC<ScreenProps<'Auth'>> = () => {
    const dispatch = useDispatch()

    const login = () => {
        dispatch(auth(email, password))
    }

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return <View style={[screenStyles.container, styles.container]}>
        <View>
            <TextInput placeholder={'Email'} value={email} onChangeText={setEmail}/>
        </View>

        <View>
            <TextInput placeholder={'Password'} value={password} onChangeText={setPassword}/>
        </View>

        <View>
            <Button title={'Вход'} onPress={login}/>
        </View>

    </View>
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
    },
})

export default AuthScreen