import React from 'react'
import {StyleSheet, Text, View} from 'react-native'


export const Preloader: React.FC = () => {
    return <View style={styles.container}>
        <Text style={styles.text}>LOADING</Text>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    text: {
        fontSize: 30
    }
})