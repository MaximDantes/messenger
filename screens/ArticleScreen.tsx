import {ScreenProps} from '../types/screens'
import React from 'react'
import {StyleSheet, View} from 'react-native'

const ArticleScreen: React.FC<ScreenProps<'Article'>> = (props) => {
    const article = props.route.params.article

    return <View style={styles.container}>

    </View>
}

const styles = StyleSheet.create({
    container: {

    }
})

export default ArticleScreen