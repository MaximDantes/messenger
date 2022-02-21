import React from 'react'
import Card from '../common/Card'
import {GestureResponderEvent, StyleProp, StyleSheet, Text, ViewStyle} from 'react-native'

type Props = {
    text: string
    onPress(e: GestureResponderEvent): void
    style?: StyleProp<ViewStyle>
}

const LibraryCard: React.FC<Props> = (props) => {
    return <Card onPress={props.onPress} style={[styles.container, props.style]}>
        <Text style={styles.text}>{props.text}</Text>
    </Card>
}

const styles = StyleSheet.create({
    container: {
        maxWidth: 300,
        marginVertical: 10,
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },

    text: {
        fontSize: 16,
        fontWeight: '500',
        color: '#000'
    }
})

export default LibraryCard