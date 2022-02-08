import React, {useEffect} from 'react'
import {
    Button,
    Dimensions,
    Image, NativeScrollEvent,
    NativeSyntheticEvent,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import {selectFiles} from '../../selectors/files-selectors'
import {useNavigation} from '@react-navigation/native'
import {getFiles} from '../../store/files/files-thunks'
import File from './../common/File'
import {StackNavigationProps} from '../../Main'

const Attachments: React.FC = (props) => {
    //@ts-ignore
    const type = props.route.params.type
    //@ts-ignore
    const chatId = props.route.params.chatId

    const files = useSelector(selectFiles(type, chatId))

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getFiles(chatId, type))
    }, [chatId])

    const navigator = useNavigation<StackNavigationProps>()
    const showImages = (position: number) => {
        navigator.navigate('Images', {images: files.map(item => item.file), position})
    }

    const onBottomReached = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
        if (e.nativeEvent.layoutMeasurement.height + e.nativeEvent.contentSize.height >= e.nativeEvent.contentOffset.y) {
            dispatch(getFiles(chatId, type))
        }
    }

    return <ScrollView onScrollEndDrag={onBottomReached}>
        <View style={styles.container}>
            {type === 'IMG' ?
                files.map((item, index) => (
                    <TouchableOpacity
                        key={item.id}
                        style={styles.imageItem}
                        onPress={() => showImages(index)}
                    >
                        <Image style={styles.image} source={{uri: item.file}}/>
                    </TouchableOpacity>
                ))
                :
                files.map(item => (
                    <View key={item.id} style={styles.fileItem}>
                        <File uri={item.file} name={item.fileName} key={item.id}/>
                    </View>
                ))}
            <Button title={'more'} onPress={() => dispatch(getFiles(chatId, type))}/>
        </View>
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
    }
})