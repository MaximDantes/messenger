import * as FileSystem from 'expo-file-system'
import {Alert} from 'react-native'

export const downloadFile = async (uri: string) => {
    // const targetUri = FileSystem.documentDirectory + 'test.pdf'
    //
    // const result = await FileSystem.downloadAsync(uri, targetUri)
    //
    // console.log(result)
    //TODO download
    Alert.alert('downloading')
}