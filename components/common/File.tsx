import React, {useEffect, useMemo, useState} from 'react'
import FeatherIcon from 'react-native-vector-icons/Feather'
import {Image, ImageBackground, StyleSheet, Text, TouchableOpacity} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {getFileType, isFileTypeImage, isFileTypeOpenable} from '../../types/file-types'
import {downloadFile} from '../../utilits/download-file'
import {NavigationProps} from '../../types/screens'
import {Animated} from 'react-native'


type Props = {
    uri: string
    name?: string
    downloadingDisabled?: boolean
    showingDisabled?: boolean
    onPress?(): void
}

const File: React.FC<Props> = (props) => {
    const name = props.name || getFileType(props.uri)
    const isImage = isFileTypeImage(getFileType(name))

    const newFileName = useMemo(() => name.length < 30 ? name : name.slice(0, 10) + '...' + name.slice(-10), [name])

    const navigator = useNavigation<NavigationProps>()

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
        onPress={props.onPress || onPress}
        style={[styles.container, !isImage && styles.fileContainer]}
    >
        {isImage ?
            <Image style={styles.image} source={{uri: props.uri}}/>
            :
            <>
                <FeatherIcon name={'file'} size={30} color={'#ffffff'}/>
                <Text style={styles.text}>{newFileName}</Text>
            </>}
    </TouchableOpacity>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#888888',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },

    fileContainer: {
        borderRadius: 5,
    },

    text: {
        textAlign: 'center',
        color: '#ffffff',
        marginHorizontal: 3,
        marginVertical: 1,
        fontSize: 12,
    },

    image: {
        width: '100%',
        height: '100%',
    }
})

export default File
