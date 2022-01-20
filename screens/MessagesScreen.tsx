import React, {useEffect, useRef} from 'react'
import {NativeScrollEvent, ScrollView, StyleSheet, View} from 'react-native'
import {screenStyles} from '../styles/common'
import {useDispatch, useSelector} from 'react-redux'
import {State} from '../store/store'
import Message from '../components/Messages/Message'
import {getChatMessages, getNextChatMessages} from '../store/chats/chats-thunks'
import {selectChat, selectIsReceivingMessages} from '../selectors/chats-selectors'
import {selectProfile} from '../selectors/profile-selectors'
import {NativeStackScreenProps} from '@react-navigation/native-stack'
import MessageForm from '../components/Messages/MessageForm'

type Props = {}

const MessagesScreen: React.FC<NativeStackScreenProps<Props>> = (props) => {
    //TODO route params types
    //@ts-ignore
    const chatId = props.route.params.id

    const dispatch = useDispatch()

    const chat = useSelector((state: State) => selectChat(state, chatId))
    const profile = useSelector(selectProfile)
    const isReceivingMessages = useSelector(selectIsReceivingMessages)

    const scrollView = useRef<ScrollView>()

    useEffect(() => {
        dispatch(getChatMessages(chatId))
    }, [chatId])

    useEffect(() => {
        props.navigation.setOptions({
            title: chat?.title || 'Сообщения'
        })
    }, [chat])

    useEffect(() => {
        scrollView.current?.scrollToEnd({animated: true})
    })

    const loadPreviousMessages = () => {
        if (!isReceivingMessages) {
            dispatch(getNextChatMessages(chatId))
        }
    }

    const isCloseToTop = ({layoutMeasurement, contentOffset, contentSize}: NativeScrollEvent) => {
        return contentOffset.y === 0
    }

    return <View style={screenStyles.container}>
        <View style={styles.container}>
            <ScrollView
                style={styles.messagesContainer}
                //@ts-ignore
                ref={scrollView}
                onScroll={({nativeEvent}) => {
                    if (isCloseToTop(nativeEvent)) {
                        loadPreviousMessages()
                    }
                }}
                scrollEventThrottle={400}
            >
                {chat?.messages.map(item => (
                    <Message
                        key={item.id}
                        text={item.text}
                        time={item.date}
                        files={item.files}
                        sentByCurrentUser={item.userId === profile?.id}
                    />
                ))}
            </ScrollView>

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

    messagesContainer: {
        width: '100%'
    }
})

export default MessagesScreen