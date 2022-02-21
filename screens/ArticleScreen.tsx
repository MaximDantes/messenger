import {NavigationProps, ScreenProps} from '../types/screens'
import React, {useEffect} from 'react'
import {Alert, Dimensions, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import File from '../components/common/File'
import {useDispatch, useSelector} from 'react-redux'
import {selectArticle, selectIsArticleInSharing} from '../store/articles/articles-selectors'
import {getArticle} from '../store/articles/articles-thunks'
import {headerStyles, screenStyles} from '../styles/common'
import {getFileName, getFileType, isFileTypeImage} from '../types/file-types'
import FeatherIcon from 'react-native-vector-icons/Feather'
import {selectProfile} from '../store/profile/profile-selectors'
import {removeArticleFromSharing, shareArticle} from '../store/articles/articles-actions'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import MessageFile from '../components/Messages/MessageFile'

const ArticleScreen: React.FC<ScreenProps<'Article'>> = (props) => {
    const articlePreview = props.route.params.articlePreview

    const navigation = useNavigation<NavigationProps>()
    const dispatch = useDispatch()

    const article = useSelector(selectArticle(articlePreview.id))
    const isInSharing = useSelector(selectIsArticleInSharing(articlePreview.id))
    const profile = useSelector(selectProfile)

    const share = () => {
        dispatch(shareArticle(articlePreview))
        navigation.navigate('Chats')
    }

    const removeFromSharing = () => {
        dispatch(removeArticleFromSharing(articlePreview.id))

        //TODO russian
        //TODO another showing
        Alert.alert('Removed from sharing')
    }

    const edit = () => {
        article && Alert.alert('in editing ' + article.id)
    }

    const createHeaderIcons = () => (
        <View style={headerStyles.iconsContainer}>
            {(article?.teacher && profile?.id === article?.teacher) && <TouchableOpacity
                onPress={edit}
            >
                <FeatherIcon name={'edit'} color={'#0976FF'} size={22} style={headerStyles.icon}/>
            </TouchableOpacity>}

            <TouchableOpacity
                onPress={isInSharing ? removeFromSharing : share}
            >
                <MaterialCommunityIcon
                    name={isInSharing ? 'share-off-outline' : 'share-outline'}
                    color={'#0976FF'}
                    size={30}
                    style={headerStyles.icon}
                />
            </TouchableOpacity>
        </View>
    )

    const renderItems = () => {
        let imagesIndex = -1
        const images = article?.files.filter(item => isFileTypeImage(getFileType(item.file))) || []

        return article?.files.map(item => {
            if (isFileTypeImage(getFileType(item.file))) {
                imagesIndex++
            }
            const fileIndex = imagesIndex

            return <View key={item.id} style={styles.file}>
                <File
                    uri={item.file}
                    name={item.fileName || getFileName(item.file)}
                    onPress={() => navigation.navigate('Images',
                        {position: fileIndex, images: images.map(item => item.file)})}
                />
            </View>
        })
    }

    useEffect(() => {
        !article && dispatch(getArticle(articlePreview.id))

        navigation.setOptions({
            headerRight: createHeaderIcons
        })
    }, [articlePreview])

    useEffect(() => {
        navigation.setOptions({
            title: article?.title || 'Статья',

            headerRight: createHeaderIcons
        })
    }, [article, profile, isInSharing])

    return <View style={[screenStyles.container, styles.container]}>
        {article && <>
            <View style={styles.textContainer}>
                <Text>{article.text}</Text>
            </View>

            <View style={styles.filesContainer}>
                {renderItems()}
            </View>
        </>}
    </View>
}

const styles = StyleSheet.create({
    container: {},

    textContainer: {
        padding: 5,
    },

    filesContainer: {
        padding: 3,
        flexDirection: 'row',
    },

    file: {
        width: '33.33%',
        height: Dimensions.get('window').width / 3,
        padding: 2,
    }
})

export default ArticleScreen