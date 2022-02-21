import React from 'react'
import {Preloader} from './Preloader'
import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native'
import Card from './Card'
import {screenStyles} from '../../styles/common'

type Props = {
    isFetching?: boolean
}

const ScrollScreen: React.FC<Props> = (props) => {
    return props.isFetching ?
        <Preloader/>
        :
        <ScrollView style={screenStyles.container}>
            <View style={styles.container}>
                {props.children}
            </View>
        </ScrollView>
}

const styles = StyleSheet.create({
    container: {
        minHeight: Dimensions.get('window').height - 105,
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default ScrollScreen