import React from 'react'
import {ImageBackground, StyleSheet, TouchableOpacity, View} from 'react-native'
import {isFileTypeImage} from '../../types/file-types'
import File from '../common/File'
import {IFile} from '../../types/entities'

type Props = {
    file: IFile
    variant: 'large' | 'small'
    isSingle: boolean
    showImages(): void
}

const MessageFormFile: React.FC<Props> = (props) => {
    const isImage = isFileTypeImage(props.file.fileType)

    const itemStyle = props.isSingle && isImage ? styles.singleContainer :
        props.variant === 'large' ? styles.largeImage : styles.smallImage

    return <View
        style={props.variant === 'large' ? styles.largeContainer : styles.smallContainer}
    >
        <View style={itemStyle}>
            <File
                uri={props.file.file}
                name={props.file.fileName}
                onPress={isImage ? props.showImages : undefined}
            />
        </View>
    </View>
}

const styles = StyleSheet.create({
    singleContainer: {
        minWidth: 250,
        minHeight: 250,
    },

    largeContainer: {
        minWidth: 150,
    },

    smallContainer: {
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
