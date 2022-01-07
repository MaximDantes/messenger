import React, {useState} from 'react'
import {DrawerScreenProps} from '@react-navigation/drawer'
import {Button, StyleSheet, TextInput, View} from 'react-native'
import {screenStyles} from '../styles/common'
import {useDispatch} from 'react-redux'
import {auth} from '../store/auth/thunks'

type Props = {}

const AuthScreen: React.FC<DrawerScreenProps<Props>> = (props) => {
    const dispatch = useDispatch()

    const login = () => {
        dispatch(auth(email, password))
    }

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return <View style={screenStyle}>
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

//TODO remove error
// @ts-ignore
const screenStyle = StyleSheet.compose(screenStyles.container, styles.container)

export default AuthScreen