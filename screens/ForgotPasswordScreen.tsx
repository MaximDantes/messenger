import React, {useEffect, useState} from 'react'
import {NavigationProps, ScreenProps} from '../types/screens'
import {Button, Text, View} from 'react-native'
import {changeScreenStyles, screenStyles} from '../styles/common'
import FormikField from '../components/common/FormikField'
import {Formik} from 'formik'
import * as Yup from 'yup'
import regex from '../utilits/regex'
import {changeEmail, restorePassword} from '../store/profile/profile-thunks'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigation} from '@react-navigation/native'
import {selectProfileErrors, selectProfileNavigation} from '../store/profile/profile-selectors'
import {errorAppeared} from '../store/profile/profile-actions'

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .matches(regex.email, 'Неверный формат email')
        .required('Обязательно для заполнения'),
})

const ForgotPasswordScreen: React.FC<ScreenProps<'ForgotPassword'>> = (props) => {
    const dispatch = useDispatch()
    const navigation = useNavigation<NavigationProps>()

    const placeholderEmail = props.route.params.email

    const [email, setEmail] = useState('')

    const errors = useSelector(selectProfileErrors)
    const profileNavigation = useSelector(selectProfileNavigation)

    useEffect(() => {
        if (profileNavigation.passwordCodeSent) {
            navigation.navigate('Verification', {email, type: 'RESTORE_PASSWORD'})
        }
    })

    const onSubmit = (values: { email: string }) => {
        setEmail(values.email)
        dispatch(restorePassword(values.email))
    }

    const removeError = () => {
        if (errors.email) {
            dispatch(errorAppeared('', 'email'))
        }
    }

    return <View style={[screenStyles.container, changeScreenStyles.container]}>
        <Text style={changeScreenStyles.text}>
            Введите ваш email, к которому привязан аккаунт. Вам будет отправлен код подтверждения для восстановления пароля
        </Text>

        <Formik
            initialValues={{email: placeholderEmail}}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            {(formik) => (
                <View style={changeScreenStyles.formContainer}>
                    <View style={changeScreenStyles.inputContainer}>
                        <FormikField
                            value={formik.values.email}
                            onChangeText={(text) => {
                                formik.handleChange('email')(text)
                                removeError()
                            }}
                            placeholder={'Email'}
                            error={errors.email || (formik.touched.email ? formik.errors.email : undefined)}
                            style={changeScreenStyles.input}
                        />
                    </View>

                    <View style={changeScreenStyles.buttonContainer}>
                        <Button
                            title={'Восстановить'}
                            onPress={formik.submitForm}
                        />
                    </View>
                </View>
            )}
        </Formik>
    </View>
}

export default ForgotPasswordScreen