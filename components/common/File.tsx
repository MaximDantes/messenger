import React from 'react'
import FeatherIcon from 'react-native-vector-icons/Feather'
import {StyleSheet, Text, TouchableOpacity} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {getFileType, isFileTypeOpenable} from '../../types/file-types'
import {downloadFile} from '../../utilits/download-file'
import {StackNavigationProps} from '../../Main'


type Props = {
    uri: string
    name?: string
    downloadingDisabled?: boolean
    showingDisabled?: boolean
}

const File: React.FC<Props> = (props) => {
    const name = props.name || getFileType(props.uri)

    const newFileName = (name.length < 30) ? name : name.slice(0, 10) + '...' + name.slice(-10)

    const navigator = useNavigation<StackNavigationProps>()

    const onPress = async () => {
        if (isFileTypeOpenable(getFileType(props.uri))) {
            if (props.showingDisabled) return

            navigator.navigate('Documents', {uri: props.uri, name: props.name})
        } else {
            if (props.downloadingDisabled) return

            await downloadFile(props.uri)
        }
    }

    return <TouchableOpacity
        style={styles.container}
        onPress={onPress}
    >
        <FeatherIcon name={'file-text'} size={30} color={'#ffffff'}/>
        <Text style={styles.text}>{newFileName}</Text>
    </TouchableOpacity>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#888888',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },

    text: {
        textAlign: 'center',
        color: '#ffffff',
        marginHorizontal: 3,
        marginVertical: 1,
        fontSize: 12,
    }
})

export default File
