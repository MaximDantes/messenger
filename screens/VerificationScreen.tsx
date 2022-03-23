import React, {useEffect} from 'react'
import {NavigationProps, ScreenProps} from '../types/screens'
import {Alert, Button, StyleSheet, Text, View} from 'react-native'
import {changeScreenStyles, screenStyles} from '../styles/common'
import {useDispatch, useSelector} from 'react-redux'
import {sendEmailCode, sendPasswordCode} from '../store/profile/profile-thunks'
import {selectProfileErrors, selectProfileNavigation} from '../store/profile/profile-selectors'
import {useNavigation} from '@react-navigation/native'
import {Formik} from 'formik'
import FormikField from '../components/common/FormikField'
import * as Yup from 'yup'
import {codeConfirmed, errorAppeared} from '../store/profile/profile-actions'

const validationSchema = Yup.object().shape({
    code: Yup.number()
        .required('Обязательно для заполнения'),
})

const VerificationScreen: React.FC<ScreenProps<'Verification'>> = (props) => {
    const email = props.route.params.email
    const type = props.route.params.type

    const dispatch = useDispatch()
    const navigation = useNavigation<NavigationProps>()

    const profileNavigation = useSelector(selectProfileNavigation)
    const errors = useSelector(selectProfileErrors)

    useEffect(() => {
        if (profileNavigation.codeConfirmed) {
            if (type === 'CHANGE_EMAIL') {
                navigation.navigate('Profile')
                Alert.alert('Email изменен', '', [{text: 'OK'}])
            }
            if (type === 'RESTORE_PASSWORD') {
                navigation.navigate('ChangePassword', {recoveryMode: true, email})
            }
            dispatch(codeConfirmed(false))
        }
    })

    const onSubmit = (values: { code: string }) => {
        if (type === 'CHANGE_EMAIL') {
            dispatch(sendEmailCode(values.code))
        }
        if (type === 'RESTORE_PASSWORD') {
            dispatch(sendPasswordCode(values.code, email))
        }
    }

    const removeError = () => {
        if (errors.code) {
            dispatch(errorAppeared('', 'code'))
        }
    }

    return <View style={[screenStyles.container, changeScreenStyles.container]}>
        <Text style={changeScreenStyles.text}>На почту {email} было отправлено сообщение с кодом подтверждения</Text>

        <Formik
            initialValues={{code: ''}}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            {(formik) => (
                <View style={changeScreenStyles.formContainer}>
                    <View style={[changeScreenStyles.inputContainer, styles.inputContainer]}>
                        <FormikField
                            value={formik.values.code}
                            onChangeText={(text) => {
                                formik.handleChange('code')(text)
                                removeError()
                            }}
                            placeholder={'Код'}
                            error={errors.code || (formik.touched.code ? formik.errors.code : undefined)}
                            style={changeScreenStyles.input}
                        />
                    </View>

                    <View style={changeScreenStyles.buttonContainer}>
                        <Button
                            title={'Подтвердить'}
                            onPress={formik.submitForm}
                        />
                    </View>
                </View>
            )}
        </Formik>
    </View>
}

const styles = StyleSheet.create({
    inputContainer: {
        width: 180
    }
})

export default VerificationScreen