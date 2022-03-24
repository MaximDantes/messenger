import {Platform, StyleSheet, TouchableOpacity, View, Button} from 'react-native'
import React, {useEffect, useState} from 'react'
import WebView from 'react-native-webview'
import {getFileName, getFileType, isFileTypeOpenable} from '../types/file-types'
import {useNavigation} from '@react-navigation/native'
import FeatherIcon from 'react-native-vector-icons/Feather'
import {NavigationProps, ScreenProps} from '../types/screens'
import Download from '../components/common/Download'
import {headerStyles} from '../styles/common'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'


const DocumentsScreen: React.FC<ScreenProps<'Documents'>> = (props) => {
    const uri = props.route.params.uri
    const name = props.route.params.name

    const navigation = useNavigation<NavigationProps>()

    const [isDownloading, setIsDownloading] = useState(false)

    useEffect(() => {
        const fileName = name || getFileName(uri)
        const editedName = fileName.length < 28 ? fileName : fileName.slice(0, 25) + '...'

        navigation.setOptions({
            title: editedName,

            headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()} style={headerStyles.back}>
                    <MaterialIcon name={'arrow-back'} color={'#000'} size={22}/>
                </TouchableOpacity>
            ),

            headerRight: () => (
                <TouchableOpacity onPress={() => setIsDownloading(true)}>
                    <FeatherIcon name={'download'} color={'#2196F3'} size={22}/>
                </TouchableOpacity>
            ),
        })
    }, [uri, name])

    const fileType = getFileType(uri)
    const isFileOpenable = isFileTypeOpenable(fileType)

    let source
    switch (fileType) {
        case 'pfd':
            source = `https://docs.google.com/gview?embedded=true&url=${uri}`
            break

        default:
            source = `https://drive.google.com/viewerng/viewer?embedded=true&url=${uri}`
    }

    return <View style={styles.container}>
        {!isFileOpenable
            ?
            <Button title={'Скачать'} onPress={() => setIsDownloading(true)}/>
            :
                <WebView
                    style={styles.container}
                    startInLoadingState={true}
                    source={{uri: source}}
                />
            }

        <Download uri={uri} isDownloading={isDownloading}/>
    </View>
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },

    iframe: {
        height: '100%'
    },
})

export default DocumentsScreen