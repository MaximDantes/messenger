import {Image, StyleSheet, Text, View} from 'react-native'
import React from 'react'
import {IChat} from '../../types/entities'
import {getPrintTimeFormat} from '../../utilits/format-date'
import Card from '../common/Card'

type Props = {
    chat: IChat
    onPress(id: number): void
}

const Chat: React.FC<Props> = (props) => {
    let lastMessageText = ''
    let isLastMessageContainsFiles = false

    if (props.chat.lastMessage) {
        if (props.chat.lastMessage.text) {
            lastMessageText = props.chat.lastMessage.text
            isLastMessageContainsFiles = false

            lastMessageText = lastMessageText.length < 30 ? lastMessageText :
                lastMessageText.slice(0, 27) + '...'
        } else {
            lastMessageText = 'Файлы'
            isLastMessageContainsFiles = true
        }
    }

    return <Card
        onPress={() => props.onPress(props.chat.id)}
        style={styles.container}
    >
        {props.chat.cover && <Image source={{uri: props.chat.cover}} style={styles.image}/>}

        <View style={styles.textContainer}>
            <Text style={styles.text}>{props.chat.title}</Text>

            <View style={styles.lastMessageDateContainer}>
                <View style={styles.lastMessageContainer}>
                    {!!props.chat.lastMessage?.user.avatar &&
                        <Image style={styles.avatar} source={{uri: props.chat.lastMessage.user.avatar}}/>}

                    <Text style={isLastMessageContainsFiles ? styles.files : styles.text}>{lastMessageText}</Text>
                </View>

                {!!props.chat.lastMessage?.date &&
                    <Text style={[styles.text, styles.date]}>
                        {getPrintTimeFormat(props.chat.lastMessage.date)}
                    </Text>}
            </View>
        </View>
    </Card>
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginVertical: 3,
    },

    textContainer: {
        flex: 1,
        paddingHorizontal: 5,
    },

    lastMessageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    lastMessageDateContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
    },

    title: {
        color: '#000',
    },

    text: {
        color: '#000',
    },

    date: {
        fontSize: 12,
    },

    files: {
        color: '#00f',
    },

    image: {
        width: 50,
        height: 50,
        borderRadius: 3,
    },

    avatar: {
        width: 26,
        height: 26,
        borderRadius: 13,
        marginRight: 10,
    }
})

export default Chat