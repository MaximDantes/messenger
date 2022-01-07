import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {View} from 'react-native'
import {screenStyles} from '../styles/common'
import {selectChats} from '../selectors/chats-selectors'
import {getChats} from '../store/chats/thunks'
import {DrawerScreenProps} from '@react-navigation/drawer'
import Chat from '../components/Chats/Chat'
import {selectProfile} from '../selectors/profile-selectors'

//TODO props type
type Props = {}

const ChatsScreen: React.FC<DrawerScreenProps<Props>> = (props) => {
    const dispatch = useDispatch()

    const profile = useSelector(selectProfile)

    const onPress = (id: number) => {
        //TODO type never
        //@ts-ignore
        props.navigation.navigate('Messages', {id})
    }

    useEffect(() => {
        if (profile) {
            dispatch(getChats(profile.id))
        }
    }, [profile])


    const chats = useSelector(selectChats)

    return <View style={screenStyles.container}>
        {chats.map(item => (
            <Chat key={item.id} chat={item} onPress={onPress}/>
        ))}
    </View>
}

export default ChatsScreen