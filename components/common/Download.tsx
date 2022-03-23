import WebView from 'react-native-webview'
import {StyleSheet, View} from 'react-native'
import React from 'react'

type Props = {
    uri: string
    isDownloading: boolean
}

const Download: React.FC<Props> = (props) => {
    return <View style={styles.container}>
        {props.isDownloading &&
            <WebView
                originWhitelist={['*']}
                startInLoadingState={true}
                source={{html: `<a href='${props.uri}' download/> <script>document.querySelector('a').click()</script>`}}
                onFileDownload={(file) => console.log(file.type)}
            />
        }
    </View>
}

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
        maxWidth: 0,
        maxHeight: 0,
    },
})

export default Download