import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {auth} from '../store/auth/thunks'
import {Button, View} from 'react-native'
import {screenStyles} from '../styles/common'
import {selectChats} from '../selectors/chats-selectors'
import {getChats} from '../store/chats/thunks'
import {DrawerScreenProps} from '@react-navigation/drawer'
import Chat from '../components/Chats/Chat'
import {selectCurrentUserProfile} from '../selectors/auth-selectors'
import {randomString} from '../utilits/dev-utilits'
import {sendMessage} from '../store/messages/thunks'

//TODO props type
type Props = {}

const ChatsScreen: React.FC<DrawerScreenProps<Props>> = (props) => {
    const dispatch = useDispatch()

    const currentUserProfile = useSelector(selectCurrentUserProfile)

    const onPress = (id: number) => {
        //TODO type never
        //@ts-ignore
        props.navigation.navigate('Messages', {id})
    }

    useEffect(() => {
        if (currentUserProfile) {
            dispatch(getChats(currentUserProfile.id))
        }
    }, [currentUserProfile])
    

    const chats = useSelector(selectChats)
    const currentUser = useSelector(selectCurrentUserProfile)

    const send = () => {
        if (chats.length > 0 && currentUser) {
            dispatch(sendMessage(randomString(), chats[0].id, currentUser.id))
        }
    }

    return <View style={screenStyles.container}>
        <Button title={'Auth'} onPress={() => dispatch(auth('f', 'e'))}/>
        <Button title={'Message'} onPress={send}/>

        {chats.map(item => (
            <Chat key={item.id} chat={item} onPress={onPress}/>
        ))}
    </View>
}

export default ChatsScreen