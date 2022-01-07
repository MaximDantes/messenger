import {StyleSheet, Text, View} from 'react-native'
import React from 'react'

type Props = {
    text: string
    time: Date
    sentByCurrentUser: boolean
}

const Message: React.FC<Props> = (props) => {
    return <View style={styles.container}>
        <View style={props.sentByCurrentUser ? currentUserMessage : styles.message}>
            <Text>{props.text}</Text>
            <Text>{props.time.getHours()}:{props.time.getMinutes()}</Text>
        </View>
    </View>
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 5,
        display: 'flex',
    },

    message: {
        borderRadius: 5,
        padding: 5,
        backgroundColor: '#dedede',
        alignSelf: 'flex-start',
    },

    currentUserMessage: {
        backgroundColor: '#E0EFFF',
        alignSelf: 'flex-end',
    }
})

//TODO remove error
// @ts-ignore
const currentUserMessage = StyleSheet.compose(styles.message, styles.currentUserMessage)

export default Message