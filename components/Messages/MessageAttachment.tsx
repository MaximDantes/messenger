import React from 'react'
import {ImageBackground, StyleSheet, TouchableOpacity, View} from 'react-native'
import {isFileTypeImage} from '../../types/file-types'
import File from '../common/File'
import {IArticle, IArticlePreview, IFile} from '../../types/entities'
import ArticlePreview from '../Articles/ArticlePreview'

type Props = {
    file?: IFile
    article?: IArticlePreview
    isSingle: boolean
    showImages?(): void
}

const MessageAttachment: React.FC<Props> = (props) => {
    const isImage = isFileTypeImage(props.file?.fileType)

    const itemStyle = props.isSingle ?
        isImage ? styles.singleImageContainer : styles.singleFileContainer : styles.container

    return <View style={itemStyle}>
        <View style={itemStyle}>
            {props.file && <File
                uri={props.file.file}
                name={props.file.fileName}
                onPress={isImage ? props.showImages : undefined}
            />}

            {props.article && <ArticlePreview articlePreview={props.article}/>}
        </View>
    </View>
}

const styles = StyleSheet.create({
    singleImageContainer: {
        width: '100%',
        minWidth: 300,
        minHeight: 300,
        borderRadius: 5,
        overflow: 'hidden',
    },

    singleFileContainer: {
        width: '100%',
        height: 150,
    },

    container: {
        width: '100%',
        minWidth: 300,
        minHeight: 180,
        marginVertical: 1,
        borderRadius: 5,
        overflow: 'hidden',
    },
})

export default MessageAttachment
