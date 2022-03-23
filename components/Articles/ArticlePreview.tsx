import React from 'react'
import {StyleSheet, Text, TouchableOpacity} from 'react-native'
import FeatherIcon from 'react-native-vector-icons/Feather'
import {useNavigation} from '@react-navigation/native'
import {NavigationProps} from '../../types/screens'
import {IArticlePreview} from '../../types/entities'

type Props = {
    articlePreview: IArticlePreview
    increaseFont?: boolean
    onLongPress?(): void
}

const ArticlePreview: React.FC<Props> = (props) => {
    const navigation = useNavigation<NavigationProps>()

    const newTitle = (props.articlePreview.title.length < 40) ? props.articlePreview.title
        : props.articlePreview.title.slice(0, 37) + '...'

    const onPress = () => {
        navigation.navigate('Article', {articlePreview: props.articlePreview})
    }

    return <TouchableOpacity
        onPress={onPress}
        onLongPress={props.onLongPress}
        style={styles.container}
    >
        <FeatherIcon name={'file-text'} size={30} color={'#ffffff'}/>
        <Text style={[styles.text, props.increaseFont && styles.increasedFont]}>
            {newTitle}
        </Text>
    </TouchableOpacity>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#16a6d2',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },

    text: {
        textAlign: 'center',
        color: '#ffffff',
        marginHorizontal: 3,
        marginVertical: 2,
        fontSize: 12,
    },

    increasedFont: {
        marginVertical: 5,
        fontSize: 16,
    },
})

export default ArticlePreview