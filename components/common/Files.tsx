import React, {ReactNode} from 'react'
import {IFile} from '../../types/entities'
import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native'
import {getFileType, isFileTypeImage} from '../../types/file-types'
import File from './File'
import {useNavigation} from '@react-navigation/native'
import {NavigationProps} from '../../types/screens'
import Ionicons from 'react-native-vector-icons/Ionicons'

type Props = {
    files: IFile[]
    downloadingDisabled?: boolean
    showingDisabled?: boolean
    onDelete?(file: IFile): void
}

const Files: React.FC<Props> = (props) => {
    const navigation = useNavigation<NavigationProps>()

    const images = props.files.filter(item => isFileTypeImage(getFileType(item.file)))

    const showImages = (position: number) => {
        navigation.navigate('Images', {images: images.map(item => item.file), position})
    }

    const renderItems = () => {
        let imagesIndex = -1

        return props.files.map((item, index) => {
            const isImage = isFileTypeImage(getFileType(item.file))

            if (isImage) {
                imagesIndex++
            }
            const fileIndex = imagesIndex

            return <View key={item.id || item.file + index} style={styles.file}>
                {!!props.onDelete &&
                    <TouchableOpacity
                    style={isImage ? [styles.filledContainer, styles.buttonContainer] : styles.buttonContainer}
                    onPress={() => props.onDelete?.(item)}
                >
                    <Ionicons name={'close'} size={22} color={'#ffffff'}/>
                </TouchableOpacity>
                }

                <File
                    uri={item.file}
                    name={item.fileName}
                    downloadingDisabled={props.downloadingDisabled}
                    showingDisabled={props.showingDisabled}
                    onPress={isFileTypeImage(getFileType(item.file)) ? () => showImages(fileIndex) : undefined}
                />
            </View>
        })
    }

    return <>{renderItems()}</>
}

const styles = StyleSheet.create({
    file: {
        width: '33.33%',
        height: Dimensions.get('window').width / 3,
        padding: 2,
    },

    filledContainer: {
        backgroundColor: '#00000066',
        borderRadius: 5,
    },

    buttonContainer: {
        position: 'absolute',
        borderRadius: 13,
        top: 5,
        right: 5,
        height: 26,
        width: 26,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
})

export default Files