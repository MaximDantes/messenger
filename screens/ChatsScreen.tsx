import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {StyleSheet, View} from 'react-native'
import {screenStyles} from '../styles/common'
import {selectChats} from '../selectors/chats-selectors'
import {getChats} from '../store/chats/chats-thunks'
import Chat from '../components/Chats/Chat'
import {selectProfile} from '../selectors/profile-selectors'
import {NavigationProps, ScreenProps} from '../types/screens'
import {useNavigation} from '@react-navigation/native'

const ChatsScreen: React.FC<ScreenProps<'Chats'>> = (props) => {
    const dispatch = useDispatch()
    const navigation = useNavigation<NavigationProps>()

    const profile = useSelector(selectProfile)

    const onPress = (id: number) => {
        navigation.navigate('Messages', {id})
    }

    useEffect(() => {
        if (profile) {
            dispatch(getChats(profile.id))
        }
    }, [profile])


    const chats = useSelector(selectChats)

    return <View style={[screenStyles.container, styles.container]}>
        {chats.map(item => (
            <Chat key={item.id} chat={item} onPress={onPress}/>
        ))}
    </View>
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 5,
    }
})

export default ChatsScreen