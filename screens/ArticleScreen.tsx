import {NavigationProps, ScreenProps} from '../types/screens'
import React, {useEffect} from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import File from '../components/common/File'

const ArticleScreen: React.FC<ScreenProps<'Article'>> = (props) => {
    const article = props.route.params.article

    const navigation = useNavigation<NavigationProps>()

    useEffect(() => {
        navigation.setOptions({
            title: article.title
        })
    }, [article])

    return <View style={styles.container}>
        <View>
            <Text>{article.description}</Text>
        </View>

        <View>
            {article.files.map(item => (
                <File uri={item.file} name={item.fileName}/>
            ))}
        </View>
    </View>
}

const styles = StyleSheet.create({
    container: {

    }
})

export default ArticleScreen