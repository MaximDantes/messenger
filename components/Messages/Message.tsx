import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native'
import React from 'react'
import {IFile} from '../../types/entities'
import {NativeStackNavigatorProps} from 'react-native-screens/lib/typescript/native-stack/types'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import MessageFiles from './MessageFiles'

type Props = {
    text: string
    time: Date
    files: IFile[]
    sentByCurrentUser: boolean
    inSending: boolean
}

const Message: React.FC<Props> = (props) => {
    return <View style={styles.container}>
        {props.inSending && <Text>SENDING</Text>}

        <View style={props.sentByCurrentUser ? currentUserMessage : styles.message}>
            <Text>{props.text}</Text>

            <MessageFiles files={props.files}/>

            <View style={styles.date}>
                <Text>{props.time.getHours()}:{props.time.getMinutes()}</Text>
            </View>
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
        maxWidth: '90%',
        borderRadius: 5,
        padding: 5,
        backgroundColor: '#dedede',
        alignSelf: 'flex-start',
    },

    currentUserMessage: {
        backgroundColor: '#E0EFFF',
        alignSelf: 'flex-end',
    },

    date: {
        flexBasis: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    }
})

//TODO remove error
// @ts-ignore
const currentUserMessage = StyleSheet.compose(styles.message, styles.currentUserMessage)

export default Message