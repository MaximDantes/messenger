import React from 'react'
import {ActivityIndicator, StyleSheet, View} from 'react-native'


export const Preloader: React.FC = () => {
    return <View style={styles.container}>
        <ActivityIndicator color={'#0976FF'} size={60} />
    </View>
}

export const MessagePreloader: React.FC = () => {
    return <View>
        <ActivityIndicator color={'#0976FF'} size={16} />
    </View>
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    text: {
        fontSize: 30
    }
})