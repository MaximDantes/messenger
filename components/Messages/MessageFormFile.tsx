import React from 'react'
import {ImageBackground, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {FileType, isFileTypeImage} from '../../types/file-types'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FeatherIcon from 'react-native-vector-icons/Feather'
import File from '../common/File'

type Props = {
    uri: string
    name: string
    type: FileType
    removeFile(): void
    showFile(): void
}

const MessageFormFile: React.FC<Props> = (props) => {
    const isImage = isFileTypeImage(props.type)

    const showFile = () => {
        if (isImage) {
            props.showFile()
        }
    }

    return <TouchableOpacity style={styles.container} onPress={showFile}>
        {isImage
            ?
            <View style={styles.imageContainer}>
                <ImageBackground style={styles.image} source={{uri: props.uri}}/>
            </View>
            :
            <File uri={props.uri} name={props.name} showingDisabled={true}/>
        }
        <TouchableOpacity
            style={isImage ? [styles.filledContainer, styles.buttonContainer] : styles.buttonContainer}
            onPress={props.removeFile}
        >
            <Ionicons name={'close'} size={22} color={'#ffffff'}/>
        </TouchableOpacity>
    </TouchableOpacity>
}

const styles = StyleSheet.create({
    container: {
        width: 100,
        height: 80,
        position: 'relative',
        marginHorizontal: 3,
        marginTop: 5,
        marginBottom: 2,
    },

    filledContainer: {
        backgroundColor: '#00000066',
        borderRadius: 5,
    },

    image: {
        width: 100,
        height: 80,
    },

    imageContainer: {
        borderRadius: 5,
        overflow: 'hidden',
    },

    buttonContainer: {
        position: 'absolute',
        borderRadius: 13,
        top: 0,
        right: 0,
        height: 26,
        width: 26,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default MessageFormFile