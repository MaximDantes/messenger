import React, {useEffect, useState} from 'react'
import {Button, KeyboardAvoidingView, StyleSheet, Text, TextInput, View} from 'react-native'
import {screenStyles} from '../styles/common'
import {useDispatch, useSelector} from 'react-redux'
import {auth} from '../store/auth/auth-thunks'
import {ScreenProps} from '../types/screens'
import {selectIsAuthError} from '../selectors/auth-selectors'
import PasswordStrengthValidator from '../components/Auth/PasswordStrengthValidator'
import PasswordInput from '../components/common/PasswordInput'

const AuthScreen: React.FC<ScreenProps<'Auth'>> = () => {
    const dispatch = useDispatch()

    const isError = useSelector(selectIsAuthError)

    useEffect(() => {
        if (isError) {
            setEmail('')
            setPassword('')
        }
    }, [isError])

    const login = () => {
        if (email && password) {
            dispatch(auth(email, password))
        }
    }

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    //TODO keyboard avoid
    return <KeyboardAvoidingView style={[screenStyles.container, styles.container]}>
        <View style={styles.itemContainer}>
            <TextInput
                style={styles.input}
                placeholder={'Логин'}
                value={email}
                onChangeText={setEmail}
            />
        </View>

        <View style={styles.itemContainer}>
            <PasswordInput
                value={password}
                onChangeText={setPassword}
                placeholder={'Пароль'}
            />
        </View>

        <View style={styles.itemContainer}>
            <Text style={isError ? styles.error : styles.hidden}>
                Неверно введен логин или пароль
            </Text>
        </View>

        <View style={[styles.itemContainer, styles.buttonContainer]}>
            <Button title={'Вход'} onPress={login}/>
        </View>
    </KeyboardAvoidingView>
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    itemContainer: {
        width: '100%',
        paddingVertical: 10,
        paddingHorizontal: 40,
        flexDirection: 'row',
        justifyContent: 'center',
    },

    buttonContainer: {
        maxWidth: 200,
    },

    input: {
        flex: 1,
    },

    error: {
        color: '#f00',
    },

    hidden: {
        opacity: 0
    },
})

export default AuthScreen