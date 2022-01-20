import React from 'react'
import {ImageBackground, StyleSheet, View, Text} from 'react-native'
import {RouteProp} from '@react-navigation/native'
import {StackNavigatorParamList} from '../Main'
import Carousel from 'react-native-snap-carousel'


type ScreenRouteProp<T extends keyof StackNavigatorParamList> = RouteProp<StackNavigatorParamList, T>

type Props<T extends keyof StackNavigatorParamList> = {
    route: ScreenRouteProp<T>
}

const ImagesScreen: React.FC<Props<'Images'>> = (props) => {
    const images = props.route.params.images
    const position = props.route.params.position

    return <View>

    </View>
}

export default ImagesScreen