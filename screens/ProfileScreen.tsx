import React, {useEffect, useState} from 'react'
import {Alert, Button, Platform, ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import {selectProfile, selectProfileFetching} from '../store/profile/profile-selectors'
import Avatar from '../components/Profile/Avatar'
import {DocumentResult} from 'expo-document-picker'
import {editProfile, setAvatar} from '../store/profile/profile-thunks'
import {Preloader} from '../components/common/Preloader'
import {NavigationProps, ScreenProps} from '../types/screens'
import {useNavigation} from '@react-navigation/native'
import FeatherIcon from 'react-native-vector-icons/Feather'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import {headerStyles} from '../styles/common'
import {logout} from '../store/auth/auth-thunks'
import ProfileForm from '../components/Profile/ProfileForm'

const ProfileScreen: React.FC<ScreenProps<'Profile'>> = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation<NavigationProps>()

    const isFetching = useSelector(selectProfileFetching)
    const profile = useSelector(selectProfile)
    console.log(profile)

    const showLogoutModal = () => {
        if (Platform.OS === 'web') {
            dispatch(logout())
        }

        Alert.alert('Выход', 'Выйти из аккаунта?', [
            {text: 'OK', onPress: () => dispatch(logout())},
            {text: 'Отмена'},
        ])
    }

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View style={headerStyles.iconsContainer}>
                    <TouchableOpacity
                        onPress={() => setEditMode(prevState => !prevState)}
                    >
                        <FeatherIcon name={'settings'} color={'#0976FF'} size={22} style={headerStyles.icon}/>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={showLogoutModal}
                    >
                        <MaterialIcon name={'exit-to-app'} color={'#0976FF'} size={22} style={headerStyles.icon}/>
                    </TouchableOpacity>
                </View>
            ),
        })
    }, [])

    useEffect(() => {
        if (profile?.temporaryPassword) {
            Alert.alert('Изменение пароля', 'Ваш аккаунт использует автоматически генерированный пароль', [
                {text: 'Изменить', onPress: () => navigation.navigate('ChangePassword', {recoveryMode: false})},
                {text: 'Позже'},
            ])
        }
    }, [profile])

    const [editMode, setEditMode] = useState(false)
    const [file, setFile] = useState<DocumentResult | null>(null)


    const saveAvatar = async () => {
        if (file && file.type === 'success') {
            dispatch(setAvatar(file))
            setFile(null)
            setEditMode(false)
        }
    }

    return isFetching
        ?
        <Preloader/>
        :
        <ScrollView style={styles.container}>
            {profile &&
                <View>
                    <Avatar editMode={editMode} source={profile?.avatar} file={file} setFile={setFile}/>

                    <ProfileForm
                        firstName={profile?.firstName || ''}
                        lastName={profile?.lastName || ''}
                        email={profile?.email || ''}
                        phoneNumber={profile?.phoneNumber || ''}
                        phonePublicity={profile?.phonePublicity}
                        editMode={editMode}
                        disableEditMode={() => setEditMode(false)}
                        saveAvatar={saveAvatar}
                    />
                </View>
            }
        </ScrollView>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})

export default ProfileScreen