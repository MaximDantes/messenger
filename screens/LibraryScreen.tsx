import React from 'react'
import {Text, View} from 'react-native'
import {screenStyles} from '../styles/common'
import {ScreenProps} from '../types/screens'

const LibraryScreen: React.FC<ScreenProps<'Library'>> = () => {
    return <View style={screenStyles.container}>
        <Text>Library</Text>
    </View>
}

export default LibraryScreen