import React, {useEffect} from 'react'
import {Dimensions, Image, StyleSheet, View} from 'react-native'
import {RouteProp, useNavigation} from '@react-navigation/native'
import Swiper from 'react-native-web-swiper'
import {NavigationProps, ScreenProps} from '../types/screens'

const ImagesScreen: React.FC<ScreenProps<'Images'>> = (props) => {
    const paramsImages = props.route.params.images
    const position = props.route.params.position || 0

    const navigation = useNavigation<NavigationProps>()

    const setTitle = (index: number) => {
        navigation.setOptions({
            title: `${index}/${paramsImages.length}`
        })
    }

    useEffect(() => {
        setTitle(position + 1)
    }, [paramsImages, position])

    return <View style={styles.container}>
        <Swiper
            controlsEnabled={false}
            onIndexChanged={index => setTitle(index + 1)}
            from={position}
        >
            {paramsImages.map((item, index) => (
                <View key={item + index}>
                    <Image style={styles.image} source={{uri: item}}/>
                </View>
            ))}
        </Swiper>
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
    }
})

export default ImagesScreen