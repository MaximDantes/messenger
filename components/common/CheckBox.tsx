import React from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import EntypoIcon from 'react-native-vector-icons/Entypo'

type Props = {
    checked: boolean
    onPress(checked: boolean): void
    text?: string
}

const CheckBox: React.FC<Props> = (props) => {
    return <View style={styles.container}>
        <TouchableOpacity
            onPress={() => props.onPress(!props.checked)}
            style={[styles.item, props.checked && styles.checkedContainer]}
        >
            {props.checked && <EntypoIcon name={'check'} size={18} color={'#fff'}/>}
        </TouchableOpacity>

        <Text>{props.text}</Text>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    item: {
        height: 20,
        width: 20,
        borderRadius: 5,
        borderColor: '#000',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 7,
    },

    checkedContainer: {
        backgroundColor: '#2196F3',
        borderColor: '#2196F3',
    },
})

export default CheckBox