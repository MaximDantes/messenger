import React, {useEffect, useState} from 'react'
import {StyleSheet, TouchableOpacity, View} from 'react-native'
import {headerStyles, screenStyles} from '../styles/common'
import {useDispatch, useSelector} from 'react-redux'
import {selectChat} from '../store/chats/chats-selectors'
import MessageForm from '../components/Messages/MessageForm'
import {getChatMessages} from '../store/messages/messages-thunks'
import MessagesContainer from '../components/Messages/MessagesContainer'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import {useNavigation} from '@react-navigation/native'
import {NavigationProps, ScreenProps} from '../types/screens'
import {IMessage} from '../types/entities'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

const MessagesScreen: React.FC<ScreenProps<'Messages'>> = (props) => {
    const chatId = props.route.params.id

    const dispatch = useDispatch()
    const navigation = useNavigation<NavigationProps>()

    const chat = useSelector(selectChat(chatId))

    const [editedMessage, setEditedMessage] = useState<IMessage | null>(null)

    const toggleChangeMode = (message?: IMessage, remove?: () => void) => {
        if (message) {
            setEditedMessage(message)
        } else {
            setEditedMessage(null)
        }

        if (remove) {
            navigation.setOptions({
                headerRight: () => (
                    <TouchableOpacity onPress={remove} style={headerStyles.stackIconsContainer}>
                        <AntDesignIcon name={'delete'} color={'#0976FF'} size={22} style={headerStyles.icon}/>
                    </TouchableOpacity>

                )
            })
        } else {
            navigation.setOptions({
                title: chat?.title || 'Сообщения',

                headerLeft: () => (
                    <TouchableOpacity onPress={() => navigation.goBack()} style={headerStyles.back}>
                        <MaterialIcon name={'arrow-back'} color={'#000'} size={22}/>
                    </TouchableOpacity>
                ),

                headerRight: () => <View style={headerStyles.stackIconsContainer}>
                    <TouchableOpacity
                        onPress={() => chat && navigation.navigate('Members', {chatId: chat.id, chatName: chat.title})}
                    >
                        <Ionicons name={'people-outline'} color={'#2196F3'} size={28} style={headerStyles.icon}/>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => navigation.navigate('Attachments', {id: chatId})}
                    >
                        <EntypoIcon name={'attachment'} color={'#2196F3'} size={22} style={headerStyles.icon}/>
                    </TouchableOpacity>
                </View>
            })
        }
    }

    useEffect(() => {
        toggleChangeMode()
    }, [chat])

    return <View style={[screenStyles.container, styles.container]}>
        <View style={styles.container}>
            {chat && <MessagesContainer chat={chat} toggleChangeMode={toggleChangeMode}/>}

            <MessageForm
                chatId={chatId}
                editedMessage={editedMessage}
                toggleEditMode={() => toggleChangeMode()}
            />
        </View>
    </View>
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        height: '100%',
        width: '100%',
    },

    headerRight: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    icon: {
        height: 40,
        width: 40,
        borderRadius: 20,
        marginRight: 7,
    },
})

export default MessagesScreen