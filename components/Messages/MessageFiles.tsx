import {StyleSheet, View} from 'react-native'
import {IFile} from '../../types/entities'
import React from 'react'
import {getFileName, getFileType, isFileTypeImage} from '../../types/file-types'
import MessageFile from './MessageFile'
import {useNavigation} from '@react-navigation/native'
import {StackNavigationProps} from '../../Main'

type Props = {
    files: IFile[]
}

const MessageFiles: React.FC<Props> = (props) => {
    const images = props.files.filter(item => isFileTypeImage(item.fileType))

    const navigator = useNavigation<StackNavigationProps>()

    const showImages = (position: number) => {
        navigator.navigate('Images', {position, images: images.map(item => item.file)})
    }

    const showFile = (file: IFile) => {
        navigator.navigate('Documents', {file})
    }

    const renderItems = () => {
        let imagesIndex = -1

        return props.files.map((item, index) => {
            if (isFileTypeImage(item.fileType)) {
                imagesIndex++
            }

            const fileIndex = imagesIndex

            return <MessageFile
                key={item.id}
                file={item}
                variant={index > 1 ? 'small' : 'large'}
                showImages={() => showImages(fileIndex)}
                showFile={() => showFile(item)}
            />
        })
    }

    return <View style={styles.container}>
        {renderItems()}
    </View>
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        flexShrink: 1,
    },
})

export default MessageFiles