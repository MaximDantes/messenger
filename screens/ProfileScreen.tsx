import React, {useEffect, useState} from 'react'
import {Alert, Button, Platform, ScrollView, StyleSheet, TouchableOpacity, useColorScheme, View} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import {selectProfile, selectProfileFetching} from '../selectors/profile-selectors'
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

    const isFetching = useSelector(selectProfileFetching)
    const profile = useSelector(selectProfile)

    const [editMode, setEditMode] = useState(false)
    const [file, setFile] = useState<DocumentResult | null>(null)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

    useEffect(() => {
        if (!editMode) {
            setFirstName(profile?.firstName || '')
            setLastName(profile?.lastName || '')
        }
    }, [editMode, profile])

    const save = async () => {
        if (file && file.type === 'success') {
            dispatch(setAvatar(file))

            setFile(null)
            setEditMode(false)
        }

        if (firstName && lastName && (firstName !== profile?.firstName || lastName !== profile.lastName)) {
            dispatch(editProfile(firstName, lastName))
            setEditMode(false)
        }
    }

    return isFetching
        ?
        <Preloader/>
        :
        <ScrollView style={styles.container}>
            <View>
                <Avatar editMode={editMode} source={profile?.avatar} file={file} setFile={setFile}/>

                <ProfileForm
                    firstName={firstName}
                    lastName={lastName}
                    editMode={editMode}
                    setFirstName={setFirstName}
                    setLastName={setLastName}
                />
            </View>

            <View style={styles.buttonsContainer}>
                {editMode &&
                    <>
                        <Button title={'Сохранить'} onPress={save}/>
                        <Button title={'Отмена'} onPress={() => setEditMode(false)}/>
                    </>
                }
            </View>
        </ScrollView>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 5
    },
})

export default ProfileScreen