import {ScrollView, StyleSheet, TextInput, TouchableOpacity, View} from 'react-native'
import React, {useState} from 'react'
import {sendMessage} from '../../store/chats/chats-thunks'
import {useDispatch, useSelector} from 'react-redux'
import * as DocumentPicker from 'expo-document-picker'
import {DocumentResult} from 'expo-document-picker'
import MessageFormFile from './MessageFormFile'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import {useNavigation} from '@react-navigation/native'
import {StackNavigationProps} from '../../Main'
import {isFileImage} from '../../types/file-types'
import {selectProfile} from '../../selectors/profile-selectors'

type Props = {
    chatId: number
}

const MessageForm: React.FC<Props> = (props) => {
    const dispatch = useDispatch()
    const navigation = useNavigation<StackNavigationProps>()

    const [message, setMessage] = useState('')
    const [files, setFiles] = useState<DocumentResult[]>([])

    const user = useSelector(selectProfile)

    const send = () => {
        if (user && (message.trim() || files.length > 0)) {
            dispatch(sendMessage(message.trim(), props.chatId, user.id, files))

            setMessage('')
            setFiles([])
        }
    }

    const pickFile = async () => {
        const file = await DocumentPicker.getDocumentAsync()

        if (file.type === 'success') {
            setFiles([...files, file])
        }
    }

    const removeFile = (file: DocumentResult) => {
        setFiles(files.filter(item => item !== file))
    }

    const showFile = (position: number) => {
        //TODO not image position
        const images: string[] = []
        files.map(item => {
            if (item.type === 'success' && isFileImage(item.mimeType)) {
                images.push(item.uri)
            }
        })

        navigation.navigate('Images', {
            images, position
        })
    }

    return <View style={styles.container}>
        <ScrollView horizontal={true}>
            {files.map((item, index) => (
                (item.type === 'success') &&
                <MessageFormFile
                    key={item.name + index}
                    uri={item.uri}
                    name={item.name}
                    type={item.mimeType || 'unknown'}
                    removeFile={() => removeFile(item)}
                    showFile={() => showFile(index)}
                />
            ))}
        </ScrollView>

        <View style={styles.messageContainer}>
            <TouchableOpacity onPress={pickFile}>
                <MaterialIcon name={'push-pin'} color={'#2196F3'} size={22}/>
            </TouchableOpacity>
            <TextInput
                style={styles.input}
                value={message}
                autoCapitalize={'sentences'}
                spellCheck={true}
                multiline={true}
                onChangeText={setMessage}
                placeholder={'Сообщение...'}
            />
            <TouchableOpacity onPress={send}>
                <Ionicons name={'send'} color={'#2196F3'} size={22}/>
            </TouchableOpacity>
        </View>
    </View>
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 5,
        backgroundColor: '#dedede',
        width: '100%',
    },

    messageContainer: {
        paddingVertical: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    input: {
        flex: 1,
        marginHorizontal: 7,
    }
})

export default MessageForm