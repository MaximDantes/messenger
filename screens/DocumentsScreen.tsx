import {Platform, StyleSheet, TouchableOpacity, View} from 'react-native'
import React, {useEffect, useState} from 'react'
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

    const [isDownloading, setIsDownloading] = useState(false)

    useEffect(() => {
        navigation.setOptions({
            title: name || getFileName(uri),

            headerRight: () => (
                <TouchableOpacity onPress={() => setIsDownloading(true)}>
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
        {Platform.OS === 'web'
            ?
            <iframe src={source} style={styles.iframe}/>
            :
            <>
                <WebView
                    style={styles.container}
                    startInLoadingState={true}
                    source={{uri: source}}
                />
                {isDownloading &&
                    <View style={styles.download}>
                        <WebView
                            originWhitelist={['*']}
                            startInLoadingState={true}
                            source={{html: `<a href='${uri}' download/> <script>document.querySelector('a').click()</script>`}}
                        />
                    </View>
                }
            </>
        }
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    iframe: {
        height: '100%'
    },

    download: {
        overflow: 'hidden',
        maxWidth: 0,
        maxHeight: 0,
    },
})

export default DocumentsScreen