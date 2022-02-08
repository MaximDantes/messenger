import React from 'react'
import {ImageBackground, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {FileType, isFileTypeImage} from '../../types/file-types'
import FeatherIcon from 'react-native-vector-icons/Feather'
import File from '../common/File'
import {IFile} from '../../types/entities'

type Props = {
    file: IFile
    variant: 'large' | 'small'
    showImages(): void
    showFile(): void
}

const MessageFormFile: React.FC<Props> = (props) => {
    const isImage = isFileTypeImage(props.file.fileType)

    const newFileName = (props.file.file.length < 30) ? props.file.file :
        props.file.file.slice(0, 10) + '...' + props.file.file.slice(-10)

    return <TouchableOpacity
        style={props.variant === 'large' ? styles.largeContainer : styles.smallContainer}
        onPress={isImage ? props.showImages : props.showFile}
    >
        {isImage
            ?
            <ImageBackground
                style={props.variant === 'large' ? styles.largeImage : styles.smallImage}
                source={{uri: props.file.file}}
            />
            :
            <View style={props.variant === 'large' ? styles.largeImage : styles.smallImage}>
                <File uri={props.file.file} name={props.file.fileName}/>
            </View>
        }
    </TouchableOpacity>
}

const styles = StyleSheet.create({
    largeContainer: {
        // width: '100%',
        minWidth: 150,
    },

    smallContainer: {
        // width: '100%',
        minWidth: 100,
    },

    largeImage: {
        width: '100%',
        minWidth: 150,
        height: 150,
    },

    smallImage: {
        width: '100%',
        minWidth: 100,
        height: 100,
    },
})

export default MessageFormFile
