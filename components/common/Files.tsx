import React, {ReactNode} from 'react'
import {IFile} from '../../types/entities'
import {Dimensions, StyleSheet, View} from 'react-native'
import {getFileType, isFileTypeImage} from '../../types/file-types'
import File from './File'
import {useNavigation} from '@react-navigation/native'
import {NavigationProps} from '../../types/screens'

type Props = {
    files: IFile[]
    downloadingDisabled?: boolean
    showingDisabled?: boolean
    itemWrapper?: ReactNode
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
            if (isFileTypeImage(getFileType(item.file))) {
                imagesIndex++
            }
            const fileIndex = imagesIndex

            // return <ItemWrapper
            //     key={item.id || item.file + index}
            //     wrapper={props.itemWrapper ? props.itemWrapper : () => <View style={styles.file}/>}
            // >
            //     <File
            //         uri={item.file}
            //         name={item.fileName}
            //         downloadingDisabled={props.downloadingDisabled}
            //         showingDisabled={props.showingDisabled}
            //         onPress={isFileTypeImage(getFileType(item.file)) ? () => showImages(fileIndex) : undefined}
            //     />
            // </ItemWrapper>

            const ItemWrapper = props.itemWrapper

            // return <ItemWrapper key={item.id || item.file + index}>
            return <View key={item.id || item.file + index} style={styles.file}>
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

// const ItemWrapper: React.FC<{ wrapper: ReactNode }> = (props) => {
//     const Wrapper = props.wrapper
//
//     return <Wrapper>
//         {props.children}
//     </Wrapper>
// }

const styles = StyleSheet.create({
    file: {
        width: '33.33%',
        height: Dimensions.get('window').width / 3,
        padding: 2,
    }
})

export default Files