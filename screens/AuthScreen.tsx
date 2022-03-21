import React from 'react'
import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {screenStyles} from '../styles/common'
import {useDispatch, useSelector} from 'react-redux'
import {auth} from '../store/auth/auth-thunks'
import {NavigationProps, ScreenProps} from '../types/screens'
import {selectIsAuthError} from '../store/auth/auth-selectors'
import {useNavigation} from '@react-navigation/native'
import {Formik} from 'formik'
import * as Yup from 'yup'
import FormikField from '../components/common/FormikField'

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .required('Поле обязательно для заполнения'),
    password: Yup.string()
        .required('Поле обязательно для заполнения'),
})

const AuthScreen: React.FC<ScreenProps<'Auth'>> = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation<NavigationProps>()

    const isError = useSelector(selectIsAuthError)

    const onSubmit = (values: { email: string, password: string }) => {
        dispatch(auth(values.email, values.password))
    }

    return <View style={[screenStyles.container, styles.container]}>
        <Formik
            initialValues={{
                email: '',
                password: '',
            }}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            {(formik) => (
                <View style={styles.formContainer}>
                    <View/>

                    <View>
                        <View style={styles.inputContainer}>
                            <FormikField
                                value={formik.values.email}
                                onChangeText={formik.handleChange('email')}
                                placeholder={'Логин'}
                                error={formik.touched.email ? formik.errors.email : undefined}
                            />
                        </View>
                        <View style={styles.inputContainer}>

                            <FormikField
                                value={formik.values.password}
                                onChangeText={formik.handleChange('password')}
                                placeholder={'Пароль'}
                                error={formik.touched.password ? formik.errors.password : undefined}
                                password={true}
                            />
                        </View>

                        <View style={styles.buttonContainer}>
                            <Button title={'Вход'} onPress={formik.submitForm}/>
                        </View>
                    </View>

                    <TouchableOpacity
                        onPress={() => navigation.navigate('ForgotPassword', {email: formik.values.email})}>
                        <Text style={styles.text}>Забыли пароль?</Text>
                    </TouchableOpacity>
                </View>
            )}
        </Formik>
    </View>
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        paddingVertical: 15,
    },

    formContainer: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    inputContainer: {
        width: 280,
        marginVertical: 5,
    },

    buttonContainer: {
        width: 120,
        marginVertical: 15,
        alignSelf: 'center',
    },

    forgetPassword: {
        alignSelf: 'flex-end',
    },

    text: {
        textAlign: 'center',
        color: '#2195F2',
        fontSize: 16,
    }
})

export default AuthScreen