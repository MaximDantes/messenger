import {
    Alert,
    Button,
    Image, KeyboardAvoidingView,
    NativeScrollEvent,
    NativeSyntheticEvent,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native'
import Message from './Message'
import React, {useEffect, useRef} from 'react'
import {getChatMessages, removeMessage} from '../../store/messages/messages-thunks'
import {useDispatch, useSelector} from 'react-redux'
import {State} from '../../store/store'
import {selectChatMessages, selectMessagesFetching} from '../../selectors/messages-selectors'
import {selectProfile} from '../../selectors/profile-selectors'
import {IChat, IMessage} from '../../types/entities'
import {getMonthName, isToday, isYesterday} from '../../utilits/format-date'
import message from './Message'
import {Preloader} from '../common/Preloader'

type Props = {
    chat: IChat
    toggleChangeMode(message?: IMessage, remove?: () => void): void
}

const MessagesContainer: React.FC<Props> = (props) => {
    const dispatch = useDispatch()

    const messages = useSelector((state: State) => selectChatMessages(state, props.chat.id))
    const profile = useSelector(selectProfile)
    const isReceivingMessages = useSelector(selectMessagesFetching)

    useEffect(() => {
        scrollView.current?.scrollToEnd()
    }, [messages[messages.length - 1]])

    const scrollView = useRef<ScrollView>(null)

    const scrollContentSize = useRef(0)

    const setScrollPosition = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
        scrollContentSize.current = e.nativeEvent.contentSize.height
    }

    const onContentSizeChange = (width: number, height: number) => {
        if (height - scrollContentSize.current > 100 || scrollContentSize.current - height > 100) {
            //scrollView.current?.scrollTo({y: height - scrollContentSize.current, animated: false})
        }
        scrollContentSize.current = height
    }


    const loadPreviousMessages = () => {
        if (!isReceivingMessages) {
            dispatch(getChatMessages(props.chat.id))
        }
    }

    const onTopReached = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
        if (e.nativeEvent.contentOffset.y < 10) {
            loadPreviousMessages()
        }
    }

    const onMessageRemove = (id: number) => {
        dispatch(removeMessage(id))
        props.toggleChangeMode()
    }

    const changeMessage = (message: IMessage) => {
        props.toggleChangeMode(message, () => onMessageRemove(message.id))
    }

    return (isReceivingMessages && messages.length === 0) ?

        <Preloader/>

        :
        <ScrollView
            style={styles.container}
            ref={scrollView}
            contentOffset={{y: 0, x: 0}}
            onScrollEndDrag={onTopReached}
            onScroll={setScrollPosition}
            scrollEventThrottle={50}
            onContentSizeChange={onContentSizeChange}
            onLayout={() => scrollView.current?.scrollToEnd({animated: false})}
        >
            {Platform.OS === 'web' && <Button title={'more'} onPress={loadPreviousMessages}/>}

            {isReceivingMessages && <Text>Загрузка сообщений</Text>}

            {messages.map((item, index, array) => (
                <View key={item.id}>
                    {item.date.getDate() !== array[index - 1]?.date.getDate() &&
                        <View style={styles.dateContainer}>
                            <Text style={styles.date}>
                                {isToday(item.date) ? 'Сегодня' :
                                    isYesterday(item.date) ? 'Вчера' :
                                        item.date.getDate() + ' ' + getMonthName(item.date.getMonth())}
                            </Text>
                        </View>
                    }
                    {item.user.id !== array[index - 1]?.user.id && item.user.id !== profile?.id &&
                        <View style={styles.userContainer}>
                            <Image source={{uri: item.user.avatar}} style={styles.userAvatar}/>
                            <Text>{item.user.firstName + ' ' + item.user.lastName}</Text>
                        </View>
                    }
                    <Message
                        text={item.text}
                        time={item.date}
                        files={item.files}
                        inSending={item.inSending || false}
                        sentByCurrentUser={item.user.id === profile?.id}
                        change={() => changeMessage(item)}
                    />
                </View>
            ))}
        </ScrollView>
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },

    userContainer: {
        marginHorizontal: 5,
        flexDirection: 'row',
        alignItems: 'center'
    },

    userAvatar: {
        height: 30,
        width: 30,
        borderRadius: 15,
        marginRight: 3,
    },

    dateContainer: {
        alignItems: 'center',
        marginVertical: 5,
    },

    date: {
        backgroundColor: '#00000044',
        borderRadius: 6,
        paddingHorizontal: 7,
        paddingVertical: 3,
        color: '#ffffff'
    }
})

export default MessagesContainer