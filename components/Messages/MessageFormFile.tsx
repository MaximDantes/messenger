import React from 'react'
import {ImageBackground, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {FileType, isFileImage} from '../../types/file-types'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FeatherIcon from 'react-native-vector-icons/Feather'

type Props = {
    uri: string
    name: string
    type: FileType
    removeFile(): void
    showFile(): void
}

const MessageFormFile: React.FC<Props> = (props) => {
    const isImage = isFileImage(props.type)

    const showFile = () => {
        if (isImage) {
            props.showFile()
        }
    }

    const newFileName = (props.name.length < 30) ? props.name :
        props.name.slice(0, 10) + '...' + props.name.slice(-10, -1)

    return <TouchableOpacity style={isImage ? styles.container : filledContainer} onPress={showFile}>
        {isImage
            ?
            <View style={styles.imageContainer}>
                <ImageBackground style={styles.image} source={{uri: props.uri}}/>
            </View>
            :
            <View style={styles.fileContainer}>
                <FeatherIcon name={'file-text'} size={30} color={'#ffffff'}/>
                <Text style={styles.fileText}>{newFileName}</Text>
            </View>
        }
        <TouchableOpacity style={isImage ? filledButtonContainer : styles.buttonContainer} onPress={props.removeFile}>
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

    filledButtonContainer: {
        right: 2,
        top: 2,
        backgroundColor: '#00000066',
    },

    fileContainer: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    fileText: {
        textAlign: 'center',
        color: '#ffffff',
        marginHorizontal: 3,
        marginVertical: 1,
        fontSize: 12,
    },

    fileIconContainer: {
        padding: 3,
        backgroundColor: '#00000066',
        borderRadius: 5,
    }
})

//TODO remove ts ignore
//@ts-ignore
const filledContainer = StyleSheet.compose(styles.container, styles.filledContainer)
//@ts-ignore
const filledButtonContainer = StyleSheet.compose(styles.buttonContainer, styles.filledButtonContainer)

export default MessageFormFile