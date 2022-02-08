import React, {useState} from 'react'
import {Button, StyleSheet, Text, View} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'

//TODO image path
//@ts-ignore
import defaultAvatar from './../assets/default-avatar.png'
import {selectProfile, selectProfileFetching} from '../selectors/profile-selectors'
import Avatar from '../components/Profile/Avatar'
import {DocumentResult} from 'expo-document-picker'
import {setAvatar} from '../store/profile/profile-thunks'
import {Preloader} from '../components/common/Preloader'
import {ScreenProps} from '../types/screens'

const ProfileScreen: React.FC<ScreenProps<'Profile'>> = (props) => {
    const dispatch = useDispatch()

    const isFetching = useSelector(selectProfileFetching)
    const profile = useSelector(selectProfile)

    const [editMode, setEditMode] = useState(false)

    const [file, setFile] = useState<DocumentResult | null>(null)

    const save = async () => {
        if (file && file.type === 'success') {
            dispatch(setAvatar(file))

            setFile(null)
        }
    }

    return isFetching
        ?
        <Preloader/>
        :
        <View style={styles.container}>
            <View>
                <Avatar editMode={editMode} source={profile?.avatar} file={file} setFile={setFile}/>

                <View><Text>{profile?.firstName || 'Имя'}</Text></View>
                <View><Text>{profile?.lastName || 'Фамилия'}</Text></View>
                <View><Text>{profile?.email}</Text></View>
            </View>

            <View style={styles.buttonsContainer}>
                {editMode ?
                    <>
                        <Button title={'Сохранить'} onPress={save}/>
                        <Button title={'Отмена'} onPress={() => setEditMode(false)}/>
                    </>
                    :
                    <>
                        <Button title={'Редактировать'} onPress={() => setEditMode(true)}/>
                        <Button title={'Изменить пароль'} onPress={() => setEditMode(true)}/>
                    </>
                }
            </View>
        </View>
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        height: '100%',
    },


    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 5
    }
})

export default ProfileScreen