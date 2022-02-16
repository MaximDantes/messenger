import {Image, ImageBackground, StyleSheet, Text, TouchableOpacity, Vibration, View} from 'react-native'
import React from 'react'
import {IFile, IMessage} from '../../types/entities'
import {NativeStackNavigatorProps} from 'react-native-screens/lib/typescript/native-stack/types'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import MessageFiles from './MessageFiles'
import {MessagePreloader} from '../common/Preloader'
import {getPrintTimeFormat} from '../../utilits/format-date'

type Props = {
    text: string
    time: Date
    files: IFile[]
    sentByCurrentUser: boolean
    inSending: boolean
    change(): void
}

const Message: React.FC<Props> = (props) => {
    const change = () => {
        if (props.sentByCurrentUser) {
            Vibration.vibrate(100)
            props.change()
        }
    }

    return <View
        style={props.sentByCurrentUser ? [styles.container, styles.currentUserMessageContainer] : styles.container}
    >
        {(props.inSending && props.sentByCurrentUser) && <View style={styles.preloader}><MessagePreloader/></View>}

        <TouchableOpacity
            style={props.sentByCurrentUser ? [styles.message, styles.currentUserMessage] : styles.message}
            onLongPress={change}
        >
            {!!props.text && <Text>{props.text}</Text>}

            <MessageFiles files={props.files}/>

            <View style={styles.date}>
                <Text>{getPrintTimeFormat(props.time)}</Text>
            </View>
        </TouchableOpacity>
    </View>
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 5,
    },

    currentUserMessageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
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
    },

    preloader: {
        marginHorizontal: 10,
    }
})

export default Message