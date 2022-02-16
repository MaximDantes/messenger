import React, {useState} from 'react'
import {Alert, Button, StyleSheet, Text, View} from 'react-native'
import {screenStyles} from '../styles/common'
import {ScreenProps} from '../types/screens'
import PasswordStrengthValidator, {PasswordStrength} from '../components/Auth/PasswordStrengthValidator'
import PasswordInput from '../components/common/PasswordInput'
import {useDispatch} from 'react-redux'
import {changePassword} from '../store/profile/profile-thunks'

const ChangePasswordScreen: React.FC<ScreenProps<'ChangePassword'>> = (props) => {
    const dispatch = useDispatch()

    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [repeatedPassword, setRepeatedPassword] = useState('')
    const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>('week')
    const [error, setError] = useState('')

    const change = () => {
        if (oldPassword && newPassword) {
            if (newPassword !== repeatedPassword) {
                setError('Пароли не совпадают')
                return
            }

            if (passwordStrength === 'week') {
                Alert.alert('Новый пароль слишком слабый', 'Использовать этот пароль?', [
                    {text: 'OK', onPress: () => dispatch(changePassword(oldPassword, newPassword))},
                    {text: 'Отмена'},
                ])
            } else {
                dispatch(changePassword(oldPassword, newPassword))
            }
        }
    }

    return <View style={[screenStyles.container, styles.container]}>
        <View style={styles.itemContainer}>
            <PasswordInput placeholder={'Старый пароль'} value={oldPassword} onChangeText={setOldPassword}/>
        </View>

        <View style={styles.itemContainer}>
            <PasswordInput placeholder={'Новый пароль'} value={newPassword} onChangeText={setNewPassword}/>
        </View>

        <View style={styles.itemContainer}>
            <PasswordInput placeholder={'Повторите пароль'} value={repeatedPassword} onChangeText={setRepeatedPassword}/>
        </View>

        {!!error && <View style={styles.itemContainer}>
            <Text style={styles.error}>{error}</Text>
        </View>}

        <View style={styles.itemContainer}>
            <PasswordStrengthValidator password={newPassword} setPasswordStrength={setPasswordStrength}/>
        </View>

        <View style={[styles.itemContainer, styles.buttonContainer]}>
            <Button title={'OK'} onPress={change}/>
        </View>
    </View>
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    itemContainer: {
        width: '100%',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 40,
    },

    buttonContainer: {
        maxWidth: 200,
    },

    error: {
        color: '#f00'
    }
})

export default ChangePasswordScreen