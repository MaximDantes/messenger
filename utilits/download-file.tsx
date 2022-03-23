import {getFileName} from '../types/file-types'
import * as FileSystem from 'expo-file-system'
import * as Permissions from 'expo-permissions'
import * as MediaLibrary from 'expo-media-library'
import {StorageAccessFramework} from 'expo-file-system'
import {Platform} from 'react-native'

export const downloadFile = async (uri: string) => {
    try {
        const targetUri = FileSystem.documentDirectory + getFileName(uri)

        const downloadedFile = await FileSystem.downloadAsync(uri, targetUri)

        if (downloadedFile.status === 200) {
            const perm = await Permissions.askAsync(Permissions.MEDIA_LIBRARY)
            if (perm.status != 'granted') {
                return
            }

            const asset = await MediaLibrary.createAssetAsync(downloadedFile.uri)
            const album = await MediaLibrary.getAlbumAsync('Download')

            if (album == null) {
                await MediaLibrary.createAlbumAsync('Download', asset, false)
            } else {
                await MediaLibrary.addAssetsToAlbumAsync([asset], album, false)
            }
        }
    } catch (e) {
        console.error(e)
    }
}