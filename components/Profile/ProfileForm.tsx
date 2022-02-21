import {Button, StyleSheet, Text, TextInput, View} from 'react-native'
import React, {useState} from 'react'
import {useNavigation} from '@react-navigation/native'
import {NavigationProps} from '../../types/screens'
import {Formik} from 'formik'
import {useDispatch} from 'react-redux'
import {editProfile} from '../../store/profile/profile-thunks'
import {IProfileInfo} from '../../types/entities'
import * as Yup from 'yup'
import FormikField from '../common/FormikField'
import FormikPhoneField from '../common/FormikPhoneField'

type Props = {
    firstName: string
    lastName: string
    phoneNumber: string
    phonePublicity: boolean
    editMode: boolean
    disableEditMode(): void
    saveAvatar(): void
}

const validationSchema = Yup.object().shape({
    firstName: Yup.string()
        .max(50, 'Слишком длинное')
        .required('Поле обязательно для заполнения'),
    lastName: Yup.string()
        .max(50, 'Слишком длинное')
        .required('Поле обязательно для заполнения'),
    phoneNumber: Yup.string()
        .matches(/\+\d{9}/, 'Неверный формат телефона')
        .required('Поле обязательно для заполнения')
})


const ProfileForm: React.FC<Props> = (props) => {
    const navigation = useNavigation<NavigationProps>()
    const dispatch = useDispatch()

    const onSubmit = (values: IProfileInfo) => {
        dispatch(editProfile(values))

        props.disableEditMode()
    }

    return <View style={styles.container}>
        {props.editMode ?
            <>
                <Formik
                    initialValues={{
                        firstName: props.firstName,
                        lastName: props.lastName,
                        phoneNumber: props.phoneNumber,
                        phonePublicity: props.phonePublicity
                    }}
                    onSubmit={onSubmit}
                    validationSchema={validationSchema}
                >
                    {(formik) => (
                        <View>
                            <FormikField
                                value={formik.values.firstName}
                                onChangeText={formik.handleChange('firstName')}
                                placeholder={'Имя'}
                                error={formik.errors.firstName}
                                style={styles.input}
                            />
                            <FormikField
                                value={formik.values.lastName}
                                onChangeText={formik.handleChange('lastName')}
                                placeholder={'Имя'}
                                error={formik.errors.lastName}
                                style={styles.input}
                            />
                            <FormikPhoneField
                                value={formik.values.phoneNumber}
                                onChangeText={formik.handleChange('phoneNumber')}
                                placeholder={'Телефон'}
                                error={formik.errors.phoneNumber}
                                style={styles.input}
                            />

                            <Button title={'Изменить пароль'}
                                    onPress={() => navigation.navigate('ChangePassword', {recoveryMode: false})}/>

                            <View style={styles.buttonsContainer}>
                                <Button title={'Сохранить'} onPress={props.saveAvatar}/>
                                <Button title={'Отмена'} onPress={props.disableEditMode}/>
                            </View>
                        </View>
                    )}
                </Formik>
            </>
            :
            <>
                <Text style={styles.text}>{props.firstName}</Text>
                <Text style={styles.text}>{props.lastName}</Text>
                <Text style={styles.text}>{props.phoneNumber}</Text>
            </>
        }
    </View>
}

const styles = StyleSheet.create({
    container: {
        padding: 7,
    },

    text: {
        fontSize: 16,
        fontWeight: '500',
        marginVertical: 5,
    },

    input: {
        marginVertical: 5,
    },

    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 5
    },
})

export default ProfileForm