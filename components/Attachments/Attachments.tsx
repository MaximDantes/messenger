import React, {useEffect, useRef} from 'react'
import {
    Button,
    Dimensions,
    Image, NativeScrollEvent,
    NativeSyntheticEvent, Platform,
    ScrollView,
    StyleSheet, Text,
    TouchableOpacity,
    View
} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import {selectFiles, selectFilesFetching} from '../../store/files/files-selectors'
import {useNavigation} from '@react-navigation/native'
import {getFiles} from '../../store/files/files-thunks'
import File from './../common/File'
import {NavigationProps, ScreenProps} from '../../types/screens'
import {MessagePreloader, Preloader} from '../common/Preloader'

const Attachments: React.FC<ScreenProps<'ImagesAttachments'>> = (props) => {
    const type = props.route.params.type
    const isFetching = useSelector(selectFilesFetching)

    const dispatch = useDispatch()
    const navigation = useNavigation<NavigationProps>()

    const chatId = props.route.params.chatId
    const files = useSelector(selectFiles(type, chatId))

    const scrollView = useRef<ScrollView>(null)

    useEffect(() => {
        //TODO set final files count
        if (files.length < 18) {
            dispatch(getFiles(chatId, type))
        }
    }, [chatId])

    useEffect(() => {
        if (files.length && isFetching) {
            scrollView.current?.scrollToEnd({animated: true})
        }
    }, [isFetching])

    const showImages = (position: number) => {
        navigation.navigate('Images', {images: files.map(item => item.file), position})
    }

    const onBottomReached = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
        if (e.nativeEvent.layoutMeasurement.height + e.nativeEvent.contentOffset.y + 50 >
            e.nativeEvent.contentSize.height) {
            dispatch(getFiles(chatId, type))
        }
    }

    return (isFetching && files.length === 0)
        ?
        <Preloader/>
        :
        <ScrollView
            onScrollEndDrag={onBottomReached}
            ref={scrollView}
        >
            <View style={styles.container}>
                {files.map((item, index) => (
                    <View key={item.id} style={type === 'IMG' ? styles.imageItem : styles.fileItem}>
                        <File
                            uri={item.file}
                            name={item.fileName}
                            onPress={type === 'IMG' ? () => showImages(index) : undefined}
                        />
                    </View>
                ))}
            </View>

            {isFetching && <View style={styles.preloaderContainer}><MessagePreloader/></View>}

            {Platform.OS === 'web' && <Button title={'more'} onPress={() => dispatch(getFiles(chatId, type))}/>}
        </ScrollView>
}

export default Attachments

const win = Dimensions.get('window')

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
    },

    imageItem: {
        width: '50%',
        height: win.width / 2,
    },

    fileItem: {
        width: '33.33%',
        height: win.width / 3,
        padding: 2,
    },

    image: {
        width: '100%',
        height: '100%',
    },

    preloaderContainer: {
        paddingVertical: 7,
    },
})