import {Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React from 'react'
import {IChat} from '../../types/entities'

type Props = {
    chat: IChat
    onPress(id: number): void
}

const Chat: React.FC<Props> = (props) => {
    return <TouchableOpacity
        onPress={() => props.onPress(props.chat.id)}
        style={styles.container}
    >
        {props.chat.cover && <ImageBackground source={{uri: props.chat.cover}} style={styles.image}/>}

        <View style={styles.textContainer}>
            <Text style={styles.title}>{props.chat.title}</Text>
            <Text style={styles.text}>{props.chat.lastMessage?.text}</Text>
        </View>
    </TouchableOpacity>
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        marginVertical: 3,
        padding: 7,
        borderRadius: 5,
        backgroundColor: '#E0EFFF',
    },

    textContainer: {
        paddingHorizontal: 5,
    },

    title: {
        color: '#000',
    },

    text: {
        flex: 1,
        color: '#000',
        justifyContent: 'center',
    },

    image: {
        width: 50,
        height: 50,
    }
})

export default Chat