import {getFileName} from '../types/file-types'
import * as FileSystem from 'expo-file-system'
import * as Permissions from 'expo-permissions'
import * as MediaLibrary from 'expo-media-library'
import {StorageAccessFramework} from 'expo-file-system'
import {Platform} from 'react-native'

export const downloadFile = async (uri: string) => {
    try {
        //TODO download

        // const directory = await StorageAccessFramework.makeDirectoryAsync('Downloads', 'ggaek-mobile')

        const targetUri = FileSystem.documentDirectory + getFileName(uri)

        const downloadedFile = await FileSystem.downloadAsync(uri, targetUri)

        if (downloadedFile.status === 200) {
            if (Platform.OS === 'android') {
                const permission = await StorageAccessFramework.requestDirectoryPermissionsAsync()

                if (!permission.granted) {
                    return
                }

                const result = await StorageAccessFramework.createFileAsync(permission.directoryUri,
                    downloadedFile.uri, 'application/pdf')

                console.log(result)

                // const permission = await Permissions.askAsync(Permissions.MEDIA_LIBRARY)
                //
                // if (permission.status !== 'granted') {
                //     return
                // }
                //
                // const asset = await MediaLibrary.createAssetAsync(downloadedFile.uri)
                // const album = await MediaLibrary.getAlbumAsync('Download')
                //
                // await MediaLibrary.addAssetsToAlbumAsync([asset], album, false)
            }
        }
    } catch (e) {
        console.error(e)
    }
}