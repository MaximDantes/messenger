import {Button, StyleSheet, Text, TextInput, View} from 'react-native'
import React, {useEffect, useState} from 'react'
import {useNavigation} from '@react-navigation/native'
import {NavigationProps} from '../../types/screens'

type Props = {
    firstName: string
    lastName: string
    editMode: boolean
    setFirstName(name: string): void
    setLastName(lastName: string): void
}

const ProfileForm: React.FC<Props> = (props) => {
    const navigation = useNavigation<NavigationProps>()

    return <View style={styles.container}>
        {props.editMode ?
            <>
                <TextInput
                    style={[styles.text, styles.input]}
                    value={props.firstName}
                    onChangeText={props.setFirstName}
                    placeholder={'Имя'}
                />
                <TextInput
                    style={[styles.text, styles.input]}
                    value={props.lastName}
                    onChangeText={props.setLastName}
                    placeholder={'Фамилия'}
                />

                <Button title={'Изменить пароль'} onPress={() => navigation.navigate('ChangePassword', {recoveryMode: false})}/>
            </>
            :
            <>
                <Text style={styles.text}>{props.firstName}</Text>
                <Text style={styles.text}>{props.lastName}</Text>
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
        borderRadius: 3,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#666666',
        paddingHorizontal: 10,
    },
})

export default ProfileForm