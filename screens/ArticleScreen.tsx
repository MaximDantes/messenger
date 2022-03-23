import {NavigationProps, ScreenProps} from '../types/screens'
import React, {useEffect} from 'react'
import {Alert, Dimensions, Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {useDispatch, useSelector} from 'react-redux'
import {selectArticle, selectArticlesFetching, selectIsArticleInSharing} from '../store/articles/articles-selectors'
import {getArticle, removeArticle} from '../store/articles/articles-thunks'
import {headerStyles, screenStyles} from '../styles/common'
import FeatherIcon from 'react-native-vector-icons/Feather'
import {selectProfile} from '../store/profile/profile-selectors'
import {removeArticleFromSharing, shareArticle} from '../store/articles/articles-actions'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import Files from '../components/common/Files'
import {Preloader} from '../components/common/Preloader'

const ArticleScreen: React.FC<ScreenProps<'Article'>> = (props) => {
    const articlePreview = props.route.params.articlePreview

    const navigation = useNavigation<NavigationProps>()
    const dispatch = useDispatch()

    const article = useSelector(selectArticle(articlePreview.id))
    const isInSharing = useSelector(selectIsArticleInSharing(articlePreview.id))
    const isFetching = useSelector(selectArticlesFetching)
    const profile = useSelector(selectProfile)

    const share = () => {
        dispatch(shareArticle(articlePreview))
        navigation.navigate('Chats')
    }

    const removeFromSharing = () => {
        dispatch(removeArticleFromSharing(articlePreview.id))

        //TODO another showing
        Alert.alert('Откреплено')
    }

    const edit = () => {
        article && navigation.navigate('ArticleForm', {editedArticle: article})
    }

    const remove = () => {
        if (article) {
            if (Platform.OS === 'web') {
                dispatch(removeArticle(article.id))
                navigation.goBack()
                return
            }

            Alert.alert('Удаление', 'Удалить запись?', [{
                text: 'OK',
                onPress: () => {
                    dispatch(removeArticle(article.id))
                    navigation.goBack()
                }
            },
                {text: 'Отмена'},
            ])
        }
    }

    const createHeaderIcons = () => (
        <View style={headerStyles.stackIconsContainer}>
            {(article?.teacher && profile?.id === article?.teacher) && <>
                <TouchableOpacity onPress={remove}>
                    <AntDesignIcon name={'delete'} color={'#0976FF'} size={22} style={headerStyles.icon}/>
                </TouchableOpacity>

                <TouchableOpacity onPress={edit}>
                    <FeatherIcon name={'edit'} color={'#0976FF'} size={22} style={headerStyles.icon}/>
                </TouchableOpacity>
            </>}


            <TouchableOpacity onPress={isInSharing ? removeFromSharing : share}>
                <MaterialCommunityIcon
                    name={isInSharing ? 'share-off-outline' : 'share-outline'}
                    color={'#0976FF'}
                    size={30}
                    style={headerStyles.icon}
                />
            </TouchableOpacity>
        </View>
    )

    useEffect(() => {
        !article && dispatch(getArticle(articlePreview.id))

        navigation.setOptions({
            title: article?.title || articlePreview.title,

            headerRight: createHeaderIcons
        })
    }, [articlePreview, article])

    useEffect(() => {
        navigation.setOptions({
            headerRight: createHeaderIcons
        })
    }, [article, profile, isInSharing])

    return <View style={[screenStyles.container, styles.container]}>
        {isFetching
            ?
            <Preloader/>
            :
            article
                ?
                <>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>{article.text}</Text>
                    </View>

                    <View style={styles.filesContainer}>
                        <Files
                            files={article.files}
                            downloadingDisabled={true}
                            showingDisabled={true}
                        />
                    </View>
                </>
                :
                <View style={styles.notFoundContainer}>
                    <Text>Такой статьи не найдено</Text>
                </View>
        }
    </View>
}

const styles = StyleSheet.create({
    container: {},

    textContainer: {
        padding: 5,
    },

    text: {
        fontSize: 16,
    },

    filesContainer: {
        padding: 3,
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
    },

    file: {
        width: '33.33%',
        height: Dimensions.get('window').width / 3,
        padding: 2,
    },

    notFoundContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default ArticleScreen