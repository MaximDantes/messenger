import React from 'react'
import {Dimensions, ImageBackground, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import defaultAvatar from '../../assets/default-avatar.png'
import * as DocumentPicker from 'expo-document-picker'
import {DocumentResult} from 'expo-document-picker'

type Props = {
    editMode: boolean
    source: string | undefined
    file: DocumentResult | null
    setFile(file: DocumentResult | null): void
}

const Avatar: React.FC<Props> = (props) => {
    const pickFile = async () => {
        const pickedFile = await DocumentPicker.getDocumentAsync({type: 'image/*'})

        props.setFile(pickedFile)
    }

    return <>
        {props.editMode ?
            <TouchableOpacity onPress={pickFile}>
                <ImageBackground
                    source={
                        (props.file && props.file.type === 'success' && props.file.uri)
                            ? {uri: props.file.uri}
                            : props.source ? {uri: props.source} : defaultAvatar}
                    style={styles.image}
                >
                    {props.editMode &&
                        <View style={styles.framesContainer}>
                            <Text style={styles.frameText}>ВЫБРАТЬ</Text>
                        </View>
                    }
                </ImageBackground>
            </TouchableOpacity>

            :

            <ImageBackground
                source={props.source ? {uri: props.source} : defaultAvatar}
                style={styles.image}
            />
        }
    </>
}

const styles = StyleSheet.create({
    image: {
        height: Dimensions.get('window').width,
    },

    framesContainer: {
        flex: 1,
        margin: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 3,
        borderStyle: 'solid',
        borderColor: '#dddddd',
        borderRadius: 15,
    },

    frameText: {
        color: '#dddddd',
        fontSize: 22,
        padding: 5,
        textShadowColor: '#000000',
        textShadowOffset: {width: 0, height: 0},
        textShadowRadius: 10
    }
})

export default Avatar