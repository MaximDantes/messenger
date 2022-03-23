import React, {useEffect, useState} from 'react'
import {Alert, Button, StyleSheet, Text, View} from 'react-native'
import {changeScreenStyles, screenStyles} from '../styles/common'
import {NavigationProps, ScreenProps} from '../types/screens'
import PasswordStrengthValidator, {PasswordStrength} from '../components/Auth/PasswordStrengthValidator'
import {useDispatch, useSelector} from 'react-redux'
import {changePassword, setPassword} from '../store/profile/profile-thunks'
import FormikField from '../components/common/FormikField'
import {selectProfileErrors, selectProfileNavigation} from '../store/profile/profile-selectors'
import {errorAppeared, passwordChanged} from '../store/profile/profile-actions'
import {useNavigation} from '@react-navigation/native'

const ChangePasswordScreen: React.FC<ScreenProps<'ChangePassword'>> = (props) => {
    const recoveryMode = props.route.params.recoveryMode
    const email = props.route.params.email

    const dispatch = useDispatch()
    const navigation = useNavigation<NavigationProps>()

    const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>('week')
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [repeatedPassword, setRepeatedPassword] = useState('')
    const [error, setError] = useState('')

    const profileErrors = useSelector(selectProfileErrors)
    const profileNavigation = useSelector(selectProfileNavigation)

    useEffect(() => {
        if (profileNavigation.passwordChanged) {
            recoveryMode ? navigation.navigate('Auth') : navigation.navigate('Profile')

            dispatch(passwordChanged(false))

            Alert.alert('Пароль изменен')
        }
    }, [profileNavigation])

    const change = (newPassword: string, oldPassword?: string) => {
        if (!recoveryMode && oldPassword) {
            dispatch(changePassword(oldPassword, newPassword))
        }
        if (recoveryMode && email) {
            dispatch(setPassword(newPassword, email))
        }
    }

    const onSubmit = () => {
        if (newPassword) {
            if (newPassword !== repeatedPassword) {
                setError('Пароли не совпадают')
                return
            }

            if (passwordStrength === 'week') {
                Alert.alert('Новый пароль слишком слабый', 'Использовать этот пароль?', [
                    {text: 'OK', onPress: () => change(newPassword, oldPassword)},
                    {text: 'Отмена'},
                ])
            } else {
                change(newPassword, oldPassword)
            }
        }
    }

    const removeProfileError = () => {
        if (profileErrors.password) {
            dispatch(errorAppeared('', 'password'))
        }
    }

    const removeError = () => {
        if (error) {
            setError('')
        }
    }

    return <View style={[screenStyles.container, changeScreenStyles.container]}>
        {!recoveryMode &&
            <View style={[changeScreenStyles.inputContainer, styles.itemContainer]}>
                <FormikField
                    placeholder={'Старый пароль'}
                    value={oldPassword}
                    onChangeText={(text) => {
                        setOldPassword(text)
                        removeProfileError()
                    }}
                    password={true}
                    error={profileErrors.password}
                />
            </View>
        }

        <View style={[changeScreenStyles.inputContainer, styles.itemContainer]}>
            <FormikField
                placeholder={'Новый пароль'}
                value={newPassword}
                onChangeText={(text => {
                    setNewPassword(text)
                    removeError()
                })}
                password={true}
            />
        </View>

        <View style={[changeScreenStyles.inputContainer, styles.itemContainer]}>
            <FormikField
                placeholder={'Повторите пароль'}
                value={repeatedPassword}
                onChangeText={(text => {
                    setRepeatedPassword(text)
                    removeError()
                })}
                password={true}
                error={error}
            />
        </View>

        <View style={styles.itemContainer}>
            <PasswordStrengthValidator password={newPassword} setPasswordStrength={setPasswordStrength}/>
        </View>

        <View style={styles.buttonContainer}>
            <Button title={'OK'} onPress={onSubmit}/>
        </View>
    </View>
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    itemContainer: {
        paddingVertical: 5,
    },

    buttonContainer: {
        minWidth: 120,
        paddingVertical: 10,
    },
})

export default ChangePasswordScreen