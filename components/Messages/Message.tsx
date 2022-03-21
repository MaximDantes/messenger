import {StyleSheet, Text, TouchableOpacity, Vibration, View} from 'react-native'
import React from 'react'
import {IArticlePreview, IFile} from '../../types/entities'
import MessageAttachments from './MessageAttachments'
import {MessagePreloader} from '../common/Preloader'
import {getPrintTimeFormat} from '../../utilits/format-date'

type Props = {
    text: string
    time: Date
    files: IFile[]
    articles: IArticlePreview[]
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

    const messageStyles = props.sentByCurrentUser ?
        [styles.message, styles.currentUserMessage, !props.text && styles.onlyFilesMessage]
        : [styles.message, !props.text && styles.onlyFilesMessage]
    const dateContainerStyles =  !props.text ? [styles.dateContainer, styles.onlyFilesDateContainer] : styles.dateContainer
    const dateTextStyles =  !props.text ? [styles.dateText, styles.onlyFilesDateText] : styles.dateText

    return <View
        style={props.sentByCurrentUser ? [styles.container, styles.currentUserMessageContainer] : styles.container}
    >
        {(props.inSending && props.sentByCurrentUser) && <View style={styles.preloader}><MessagePreloader/></View>}

        <TouchableOpacity
            style={messageStyles}
            onLongPress={change}
        >
            {!!props.text && <Text>{props.text}</Text>}

            <MessageAttachments files={props.files} articles={props.articles}/>

            <View style={dateContainerStyles}>
                <Text style={dateTextStyles}>{getPrintTimeFormat(props.time)}</Text>
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
        maxWidth: 310,
        minWidth: 50,
        borderRadius: 8,
        padding: 5,
        backgroundColor: '#dedede',
        alignSelf: 'flex-start',
    },

    onlyFilesMessage: {
        padding: 0,
    },

    onlyFilesDateContainer: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        padding: 3,
    },

    currentUserMessage: {
        backgroundColor: '#E0EFFF',
        alignSelf: 'flex-end',
    },

    dateContainer: {
        flexBasis: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },

    dateText: {
        fontSize: 12,
    },

    onlyFilesDateText: {
        backgroundColor: '#00000066',
        borderRadius: 5,
        padding: 3,
        color: '#fff',
    },

    preloader: {
        marginHorizontal: 10,
    }
})

export default Message