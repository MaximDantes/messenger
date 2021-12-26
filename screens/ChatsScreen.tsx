import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {auth, getUser} from '../store/auth/thunks'
import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {screenStyles} from '../styles/common'
import {chatsSelector} from '../selectors/chats-selectors'
import {getChats} from '../store/chats/thunks'
import {DrawerScreenProps} from '@react-navigation/drawer'
import Chat from '../components/Chats/Chat'

//TODO props type
type Props = {}

const ChatsScreen: React.FC<DrawerScreenProps<Props>> = (props) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getChats(1))
    }, [])

    const onPress = (id: number) => {
        //TODO type never
        //@ts-ignore
        props.navigation.navigate('Messages', {id})
    }

    const chats = useSelector(chatsSelector)

    return <View style={screenStyles.container}>
        <Button title={'Auth'} onPress={() => dispatch(auth('f', 'e'))}/>
        <Button title={'User'} onPress={() => dispatch(getUser(1))}/>

        {chats.map(item => (
            <Chat key={item.id} chat={item} onPress={onPress}/>
        ))}
    </View>
}

export default ChatsScreen