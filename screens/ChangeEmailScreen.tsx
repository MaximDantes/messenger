import {NavigationProps, ScreenProps} from '../types/screens'
import {Button, StyleSheet, Text, View} from 'react-native'
import {changeScreenStyles, screenStyles} from '../styles/common'
import React, {useEffect} from 'react'
import * as Yup from 'yup'
import FormikField from '../components/common/FormikField'
import {Formik} from 'formik'
import regex from '../utilits/regex'
import {useDispatch, useSelector} from 'react-redux'
import {changeEmail} from '../store/profile/profile-thunks'
import {useNavigation} from '@react-navigation/native'
import {
    selectEmailForVerification,
    selectProfile,
    selectProfileErrors,
    selectProfileNavigation
} from '../store/profile/profile-selectors'
import {emailForVerificationChanged} from '../store/profile/profile-actions'

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .matches(regex.email, 'Неверный формат email')
        .required('Обязательно для заполнения'),
})

const ChangeEmailScreen: React.FC<ScreenProps<'ChangeEmail'>> = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation<NavigationProps>()

    const emailError = useSelector(selectProfileErrors)

    const profileNavigation = useSelector(selectProfileNavigation)
    const emailForVerification = useSelector(selectEmailForVerification)

    useEffect(() => {
        if (profileNavigation.emailCodeSent) {
            navigation.navigate('Verification', {email: emailForVerification, type: 'CHANGE_EMAIL'})
            dispatch(emailForVerificationChanged(''))
        }
    })

    const onSubmit = (values: { email: string }) => {
        dispatch(changeEmail(values.email))
    }

    return <View style={[screenStyles.container, changeScreenStyles.container]}>
        <Text style={changeScreenStyles.text}>Введите новый email, на который будет отправлен код подтверждения</Text>

        <Formik
            initialValues={{
                email: '',
            }}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            {(formik) => (
                <View style={changeScreenStyles.formContainer}>
                    <View style={changeScreenStyles.inputContainer}>
                        <FormikField
                            value={formik.values.email}
                            onChangeText={formik.handleChange('email')}
                            placeholder={'Новый email'}
                            error={emailError.email || (formik.touched.email ? formik.errors.email : undefined)}
                            style={changeScreenStyles.input}
                        />
                    </View>

                    <View style={changeScreenStyles.buttonContainer}>
                        <Button
                            title={'Отправить'}
                            onPress={formik.submitForm}
                        />
                    </View>
                </View>
            )}
        </Formik>
    </View>
}

export default ChangeEmailScreen