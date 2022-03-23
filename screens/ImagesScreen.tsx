import React, {useEffect} from 'react'
import {Dimensions, Image, StyleSheet, TouchableOpacity, View} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import Swiper from 'react-native-web-swiper'
import {NavigationProps, ScreenProps} from '../types/screens'
import FeatherIcon from 'react-native-vector-icons/Feather'
import {downloadFile} from '../utilits/download-file'
import {ReactNativeZoomableView} from '@dudigital/react-native-zoomable-view/dist'

const ImagesScreen: React.FC<ScreenProps<'Images'>> = (props) => {
    const paramsImages = props.route.params.images
    const position = props.route.params.position || 0

    const navigation = useNavigation<NavigationProps>()

    useEffect(() => {
        setTitle(position)
    }, [paramsImages, position])

    const setTitle = (index: number) => {
        navigation.setOptions({
            title: `${index + 1}/${paramsImages.length}`,

            headerRight: () => (
                <TouchableOpacity onPress={() => downloadFile(paramsImages[index])}>
                    <FeatherIcon name={'download'} color={'#2196F3'} size={22}/>
                </TouchableOpacity>
            )
        })
    }

    const onIndexChange = (index: number) => {
        setTitle(index)
    }

    return <View style={styles.container}>
        <ReactNativeZoomableView
            maxZoom={2}
            minZoom={1}
            zoomStep={0.5}
            initialZoom={1}
            bindToBorders={true}
        >
            <Swiper
                controlsEnabled={false}
                onIndexChanged={onIndexChange}
                from={position}
            >
                {paramsImages.map((item, index) => (
                    <View key={item + index}>
                        <Image style={styles.image} source={{uri: item}}/>
                    </View>
                ))}
            </Swiper>
        </ReactNativeZoomableView>
    </View>
}

const win = Dimensions.get('window')

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    slideContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: win.width,
        height: '100%',
        resizeMode: 'contain',
    },

    download: {
        overflow: 'hidden',
        maxWidth: 300,
        height: 300,
    },
})

export default ImagesScreen