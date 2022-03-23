import {StyleSheet, View} from 'react-native'
import {IArticlePreview, IFile} from '../../types/entities'
import React from 'react'
import {isFileTypeImage} from '../../types/file-types'
import MessageAttachment from './MessageAttachment'
import {useNavigation} from '@react-navigation/native'
import {NavigationProps} from '../../types/screens'

type Props = {
    files: IFile[]
    articles: IArticlePreview[]
    onLongPress(): void
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

            return <MessageAttachment
                key={item.id || item.file + index}
                file={item}
                isSingle={props.files.length + props.articles.length === 1}
                showImages={() => showImages(fileIndex)}
                onLongPress={props.onLongPress}
            />
        })


        const articles = props.articles.map(item => (
            <MessageAttachment
                key={item.id}
                article={item}
                isSingle={props.files.length + props.articles.length === 1}
                onLongPress={props.onLongPress}
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
        flexDirection: 'row',
        flexWrap: 'wrap',
        flexShrink: 1,
        borderRadius: 5,
        overflow: 'hidden',
    },
})

export default MessageAttachments