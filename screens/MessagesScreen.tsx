import React, {useEffect} from 'react'
import {StyleSheet, TouchableOpacity, View} from 'react-native'
import {screenStyles} from '../styles/common'
import {useDispatch, useSelector} from 'react-redux'
import {State} from '../store/store'
import {selectChat} from '../selectors/chats-selectors'
import MessageForm from '../components/Messages/MessageForm'
import {getChatMessages} from '../store/messages/messages-thunks'
import MessagesContainer from '../components/Messages/MessagesContainer'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import {useNavigation} from '@react-navigation/native'
import {NavigationProps, ScreenProps} from '../types/screens'

const MessagesScreen: React.FC<ScreenProps<'Messages'>> = (props) => {
    const chatId = props.route.params.id

    const dispatch = useDispatch()

    const navigation = useNavigation<NavigationProps>()

    const chat = useSelector((state: State) => selectChat(state, chatId))

    useEffect(() => {
        dispatch(getChatMessages(chatId))
    }, [chatId])

    useEffect(() => {
        navigation.setOptions({
            title: chat?.title || 'Сообщения',

            headerRight: () => (
                <TouchableOpacity
                    onPress={() => navigation.navigate('Attachments', {id: chatId})}
                >
                    <EntypoIcon name={'attachment'} color={'#2196F3'} size={22}/>
                </TouchableOpacity>
            )
        })
    }, [chat])

    return <View style={screenStyles.container}>
        <View style={styles.container}>
            {chat && <MessagesContainer chat={chat}/>}

            <MessageForm chatId={chatId}/>
        </View>
    </View>
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '100%',
        width: '100%',
    },

    headerRight: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    headerIcon: {
        height: 40,
        width: 40,
        borderRadius: 20,
        marginRight: 7,
    },
})

export default MessagesScreen