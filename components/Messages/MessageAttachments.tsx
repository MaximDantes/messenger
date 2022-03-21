import {StyleSheet, Text, View} from 'react-native'
import {IArticlePreview, IFile} from '../../types/entities'
import React from 'react'
import {isFileTypeImage} from '../../types/file-types'
import MessageFile from './MessageAttachment'
import {useNavigation} from '@react-navigation/native'
import {NavigationProps} from '../../types/screens'
import ArticlePreview from '../Articles/ArticlePreview'

type Props = {
    files: IFile[]
    articles: IArticlePreview[]
}

const MessageAttachments: React.FC<Props> = (props) => {
    const images = props.files.filter(item => isFileTypeImage(item.fileType))

    const navigator = useNavigation<NavigationProps>()

    const showImages = (position: number) => {
        navigator.navigate('Images', {position, images: images.map(item => item.file)})
    }

    const renderItems = () => {
        let imagesIndex = -1

        const files = props.files.map((item, index) => {
            if (isFileTypeImage(item.fileType)) {
                imagesIndex++
            }

            const fileIndex = imagesIndex

            return <MessageFile
                key={item.id || item.file + index}
                file={item}
                isSingle={props.files.length === 1}
                showImages={() => showImages(fileIndex)}
            />
        })


        const articles = props.articles.map(item => (
            <MessageFile
                key={item.id}
                article={item}
                isSingle={props.files.length === 1}
            />
        ))

        return [...files, ...articles]
    }

    return <View style={styles.container}>
        {renderItems()}
    </View>
}

const styles = StyleSheet.create({
    container: {
        // width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        flexShrink: 1,
        borderRadius: 5,
        overflow: 'hidden',
    },
})

export default MessageAttachments