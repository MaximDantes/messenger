import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
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
        <View>
            <Text style={styles.text}>{props.chat.title}</Text>
        </View>
    </TouchableOpacity>
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#E0EFFF',
        borderRadius: 5,
        paddingVertical: 15,
        paddingHorizontal: 10,
        width: '100%',
        marginVertical: 3,
    },
    text: {
        color: '#000'
    },
})

export default Chat