import React, {useEffect, useState} from 'react'
import {DrawerScreenProps} from '@react-navigation/drawer'
import {Button, ScrollView, StyleSheet, TextInput, View} from 'react-native'
import {screenStyles} from '../styles/common'
import {useDispatch, useSelector} from 'react-redux'
import {State} from '../store/store'
import Message from '../components/Messages/Message'
import {getChatMessages, sendMessage} from '../store/chats/thunks'
import {selectChat} from '../selectors/chats-selectors'
import * as DocumentPicker from 'expo-document-picker'
import {selectProfile} from '../selectors/profile-selectors'
import {NativeStackScreenProps} from '@react-navigation/native-stack'

type Props = {}

const MessagesScreen: React.FC<NativeStackScreenProps<Props>> = (props) => {
    //TODO route params types
    //@ts-ignore
    const chatId = props.route.params.id

    const dispatch = useDispatch()

    const [message, setMessage] = useState('')

    const chat = useSelector((state: State) => selectChat(state, chatId))
    const profile = useSelector(selectProfile)

    useEffect(() => {
        dispatch(getChatMessages(chatId))
    }, [chatId])

    useEffect(() => {
        props.navigation.setOptions({
            title: chat?.title || 'Сообщения'
        })
    }, [chat])


    const send = () => {
        if (message.trim() && chat && profile) {
            dispatch(sendMessage(message.trim(), chat.id))

            setMessage('')
        }
    }

    const pickFile = async () => {
        const file = await DocumentPicker.getDocumentAsync()

        console.log(file)
    }

    return <View style={screenStyles.container}>
        <View style={styles.container}>
            <ScrollView style={styles.messagesContainer}>
                {chat?.messages.map(item => (
                    <Message
                        key={item.id}
                        text={item.text}
                        time={item.date}
                        sentByCurrentUser={item.userId === profile?.id}
                    />
                ))}
            </ScrollView>

            <View style={styles.newMessageContainer}>
                <Button title={'P'} onPress={pickFile}/>

                <Button title={'S'} onPress={send}/>

                <TextInput
                    style={styles.newMessageInput}
                    value={message}
                    autoCapitalize={'sentences'}
                    spellCheck={true}
                    multiline={true}
                    onChangeText={setMessage}
                    placeholder={'Сообщение...'}
                />

            </View>
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
    },

    newMessageContainer: {
        backgroundColor: '#dedede',
        paddingHorizontal: 5,
        paddingVertical: 10,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
    },

    newMessageInput: {
        marginLeft: 10,
        width: '100%',
    }
})

export default MessagesScreen