import {Button, StyleSheet, Text, View} from 'react-native'
import React, {useEffect, useState} from 'react'
import {useNavigation} from '@react-navigation/native'
import {NavigationProps} from '../../types/screens'
import {Formik} from 'formik'
import {useDispatch} from 'react-redux'
import {editProfile} from '../../store/profile/profile-thunks'
import {IProfileInfo} from '../../types/entities'
import * as Yup from 'yup'
import FormikField from '../common/FormikField'
import CheckBox from '../common/CheckBox'
import regex from '../../utilits/regex'
import Card from '../common/Card'
import Ionicons from 'react-native-vector-icons/Ionicons'

type Props = {
    firstName: string
    lastName: string
    email: string
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
        .matches(regex.phone, 'Неверный формат телефона')
        .required('Поле обязательно для заполнения')
})


const ProfileForm: React.FC<Props> = (props) => {
    const navigation = useNavigation<NavigationProps>()
    const dispatch = useDispatch()

    const [isChecked, setIsChecked] = useState(false)
    useEffect(() => {
        setIsChecked(props.phonePublicity)
    }, [props.phonePublicity])

    const onSubmit = (values: Omit<IProfileInfo, 'phonePublicity'>) => {
        dispatch(editProfile({...values, phonePublicity: !isChecked}))

        props.saveAvatar()
        props.disableEditMode()
    }

    const changeEmail = () => {
        props.disableEditMode()
        navigation.navigate('ChangeEmail')
    }

    return <View style={styles.container}>
        {props.editMode ?
            <>
                <Formik
                    initialValues={{
                        firstName: props.firstName,
                        lastName: props.lastName,
                        phoneNumber: props.phoneNumber,
                    }}
                    onSubmit={onSubmit}
                    validationSchema={validationSchema}
                >
                    {(formik) => (
                        <View>
                            <View style={styles.inputContainer}>
                                <FormikField
                                    value={formik.values.firstName}
                                    onChangeText={formik.handleChange('firstName')}
                                    placeholder={'Имя'}
                                    error={formik.errors.firstName}
                                    style={styles.input}
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <FormikField
                                    value={formik.values.lastName}
                                    onChangeText={formik.handleChange('lastName')}
                                    placeholder={'Имя'}
                                    error={formik.errors.lastName}
                                    style={styles.input}
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <FormikField
                                    value={formik.values.phoneNumber}
                                    onChangeText={formik.handleChange('phoneNumber')}
                                    placeholder={'Телефон'}
                                    error={formik.errors.phoneNumber}
                                    style={styles.input}
                                    keyboardType={'phone-pad'}
                                />
                            </View>
                            <CheckBox
                                checked={isChecked}
                                onPress={setIsChecked}
                                text={'Скрывать контактные данные'}
                                style={styles.input}
                            />

                            <View style={styles.buttonsContainer}>
                                <View style={styles.inputContainer}>
                                    <Card
                                        style={styles.card}
                                        onPress={changeEmail}
                                    >
                                        <Ionicons name={'mail-outline'} size={22} color={'#00000066'}/>
                                        <Text style={styles.text}>Логин</Text>
                                    </Card>
                                </View>

                                <View style={styles.inputContainer}>
                                    <Card
                                        style={styles.card}
                                        onPress={() => navigation.navigate('ChangePassword', {recoveryMode: false})}
                                    >
                                        <Ionicons name={'key-outline'} size={22} color={'#00000066'}/>
                                        <Text style={styles.text}>Пароль</Text>
                                    </Card>
                                </View>
                            </View>

                            <View style={styles.buttonsContainer}>
                                <View style={styles.buttonContainer}>
                                    <Button
                                        title={'Сохранить'}
                                        onPress={formik.submitForm}
                                        disabled={formik.isSubmitting}
                                    />
                                </View>
                                <View style={styles.buttonContainer}>
                                    <Button title={'Отмена'} onPress={props.disableEditMode}/>
                                </View>
                            </View>
                        </View>
                    )}
                </Formik>
            </>
            :
            <>
                <Text style={styles.text}>{props.firstName}</Text>
                <Text style={styles.text}>{props.lastName}</Text>
                <Text style={styles.text}>{props.email}</Text>
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
        fontSize: 18,
        fontWeight: '500',
        paddingVertical: 5,
        paddingHorizontal: 10,
    },

    input: {
        fontSize: 18,
        marginVertical: 5,
    },

    inputContainer: {
        paddingVertical: 5,
    },

    checkBox: {
        borderColor: '#f00',
        backgroundColor: '#f00',
    },

    buttonContainer: {
        width: 120,
    },

    card: {
        width: 150,
        flexDirection: 'row',
        alignItems: 'center',
    },

    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 5
    },
})

export default ProfileForm