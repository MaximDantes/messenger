import {DrawerScreenProps} from '@react-navigation/drawer'
import React from 'react'
import {Dimensions, ImageBackground, StyleSheet, Text, View} from 'react-native'
import {useSelector} from 'react-redux'

//TODO image path
//@ts-ignore
import defaultAvatar from './../assets/default-avatar.png'
import {selectProfile} from '../selectors/profile-selectors'

type Props = {}

const ProfileScreen: React.FC<DrawerScreenProps<Props>> = (props) => {
    const profile = useSelector(selectProfile)

    return <View>
        <ImageBackground source={defaultAvatar} style={styles.image}/>

        <View><Text>{profile?.firstName}</Text></View>
        <View><Text>{profile?.lastName}</Text></View>
        <View><Text>{profile?.email}</Text></View>
    </View>
}

const styles = StyleSheet.create({
    image: {
        height: Dimensions.get('window').width,
    },
})

export default ProfileScreen