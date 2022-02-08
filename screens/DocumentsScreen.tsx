import {StyleSheet, TouchableOpacity, View} from 'react-native'
import React, {useEffect} from 'react'
import WebView from 'react-native-webview'
import {getFileName, getFileType} from '../types/file-types'
import {useNavigation} from '@react-navigation/native'
import {downloadFile} from '../utilits/download-file'
import FeatherIcon from 'react-native-vector-icons/Feather'
import {NavigationProps, ScreenProps} from '../types/screens'

const DocumentsScreen: React.FC<ScreenProps<'Documents'>> = (props) => {
    const uri = props.route.params.uri
    const name = props.route.params.name

    const navigation = useNavigation<NavigationProps>()

    useEffect(() => {
        navigation.setOptions({
            title: name || getFileName(uri),

            headerRight: () => (
                <TouchableOpacity onPress={() => downloadFile(uri)}>
                    <FeatherIcon name={'download'} color={'#2196F3'} size={22}/>
                </TouchableOpacity>
            )
        })
    }, [uri, name])

    let source
    switch (getFileType(uri)) {
        case 'pfd':
            source = `https://docs.google.com/gview?embedded=true&url=${uri}`
            break

        default:
            source = `https://drive.google.com/viewerng/viewer?embedded=true&url=${uri}`
    }

    return <View style={styles.container}>
        <WebView
            source={{uri: source}}
            startInLoadingState={true}
            style={styles.container}
        />
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})

export default DocumentsScreen