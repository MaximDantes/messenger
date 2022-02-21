import {Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native'
import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import * as DocumentPicker from 'expo-document-picker'
import MessageFormAttachment from './MessageFormAttachment'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import {useNavigation} from '@react-navigation/native'
import {isFileTypeImage} from '../../types/file-types'
import {selectProfile} from '../../store/profile/profile-selectors'
import {sendMessage} from '../../store/messages/messages-thunks'
import {NavigationProps} from '../../types/screens'
import {IFile, IMessage} from '../../types/entities'
import {selectSharedArticle} from '../../store/articles/articles-selectors'
import ArticlePreview from '../Articles/ArticlePreview'
import {removeArticleFromSharing} from '../../store/articles/articles-actions'

type Props = {
    chatId: number
    editedMessage: IMessage | null
    toggleEditMode(): void
}

const MessageForm: React.FC<Props> = (props) => {
    const dispatch = useDispatch()
    const navigation = useNavigation<NavigationProps>()

    const [message, setMessage] = useState('')
    const [files, setFiles] = useState<IFile[]>([])

    const sharedArticles = useSelector(selectSharedArticle)
    const user = useSelector(selectProfile)

    useEffect(() => {
        if (props.editedMessage) {
            setMessage(props.editedMessage.text)
            setFiles(props.editedMessage.files)
        } else {
            setMessage('')
            setFiles([])
        }

    }, [props.editedMessage])

    const send = () => {
        if (!props.editedMessage) {
            if (user && (message.trim() || files.length > 0)) {
                dispatch(sendMessage(message.trim(), props.chatId,
                    user.id, files, sharedArticles.map(item => item.id)))

                setMessage('')
                setFiles([])
            }
        } else {
            Alert.alert('message edited: ' + message, ' files count: ' + files.length)
            props.toggleEditMode()
        }
    }

    const pickFile = async () => {
        const file = await DocumentPicker.getDocumentAsync()

        if (file.type === 'success') {
            setFiles([...files, {
                file: file.uri,
                fileName: file.name,
                fileType: file.mimeType,
                fileSize: file.size,
                fileData: file.file,
            }])
        }
    }

    const removeFile = (file: IFile) => {
        setFiles(files.filter(item => item !== file))
    }

    const showFile = (position: number) => {
        const images: string[] = []

        files.map(item => {
            if (isFileTypeImage(item.fileType)) {
                images.push(item.file)
            }
        })

        navigation.navigate('Images', {
            images, position
        })
    }

    const renderItems = () => {
        let imagesIndex = -1

        return [...files.map((item, index) => {
                if (isFileTypeImage(item.fileType)) {
                    imagesIndex++
                }

                const fileIndex = imagesIndex

                return <MessageFormAttachment
                    key={(item.fileName || '') + index}
                    uri={item.file}
                    name={item.fileName || ''}
                    type={item.fileType || 'unknown'}
                    removeFile={() => removeFile(item)}
                    showFile={() => showFile(fileIndex)}
                />
            }
        ), ...sharedArticles.map(item => (
            <MessageFormAttachment
                key={item.id}
                articlePreview={item}
                type={'article'}
                removeFile={() => dispatch(removeArticleFromSharing(item.id))}
            />
        ))]
    }

    return <View style={styles.container}>
        {!!props.editedMessage && <View style={styles.editContainer}>
            <Text>Редактирование сообщения</Text>
            <TouchableOpacity onPress={props.toggleEditMode}>
                <MaterialIcon name={'close'} color={'#666666'} size={22}/>
            </TouchableOpacity>
        </View>}

        {sharedArticles.map((item, index) => (
            <TouchableOpacity key={item.id + index}>
                <ArticlePreview articlePreview={item}/>
            </TouchableOpacity>
        ))}

        <ScrollView horizontal={true}>
            {renderItems()}
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
    },

    editContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 5,
    }
})

export default MessageForm