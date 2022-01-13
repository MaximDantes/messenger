import {Button, StyleSheet, Text, TextInput, View} from 'react-native'
import React, {useState} from 'react'
import {sendMessage} from '../../store/chats/thunks'
import {useDispatch} from 'react-redux'
import * as DocumentPicker from 'expo-document-picker'
import {DocumentResult} from 'expo-document-picker'

type Props = {
    chatId: number
    showFile(url: string): void
}

const MessageForm: React.FC<Props> = (props) => {
    const dispatch = useDispatch()

    const [message, setMessage] = useState('')
    const [files, setFiles] = useState<DocumentResult[]>([])

    const send = () => {
        if (message.trim()) {
            dispatch(sendMessage(message.trim(), props.chatId, files))

            setMessage('')
            setFiles([])
        }
    }

    const pickFile = async () => {
        const file = await DocumentPicker.getDocumentAsync()

        if (file.type === 'success') {
            // props.showFile(file.uri)

            setFiles([...files, file])
        }
    }

    return <View style={styles.container}>
        <View style={styles.filesContainer}>
            {files.map(item => (
                (item.type === 'success') && <Text key={item.name}>{item.name}</Text>
            ))}
        </View>

        <View style={styles.messageContainer}>
            <Button title={'P'} onPress={pickFile}/>
            <TextInput
                style={styles.input}
                value={message}
                autoCapitalize={'sentences'}
                spellCheck={true}
                multiline={true}
                onChangeText={setMessage}
                placeholder={'Сообщение...'}
            />
            <Button title={'S'} onPress={send}/>
        </View>
    </View>
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 5,
        backgroundColor: '#dedede',
        width: '100%',
    },

    filesContainer: {},

    messageContainer: {
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    input: {
        flex: 1,
        marginHorizontal: 7,
    }
})

export default MessageForm