import React from 'react'
import {Dimensions, ImageBackground, StyleSheet, TouchableOpacity} from 'react-native'

//TODO image path
//@ts-ignore
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
                />
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
})

export default Avatar