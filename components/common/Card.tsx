import React from 'react'
import {GestureResponderEvent, StyleProp, StyleSheet, TouchableOpacity, ViewStyle} from 'react-native'

type Props = {
    onPress?(e: GestureResponderEvent): void
    style?: StyleProp<ViewStyle>
}

const Card: React.FC<Props> = (props) => {
    return <TouchableOpacity
        style={[styles.container, props.style]}
        onPress={props.onPress}
    >
        {props.children}
    </TouchableOpacity>
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 7,
        borderRadius: 5,
        backgroundColor: '#E0EFFF',
        borderWidth: 1,
        borderColor: '#bbbbbbff',
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default Card