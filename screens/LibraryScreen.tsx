import React from 'react'
import {Text, View} from 'react-native'
import {DrawerScreenProps} from '@react-navigation/drawer'
import {screenStyles} from '../styles/common'

//TODO props type
type Props = {}

const LibraryScreen: React.FC<DrawerScreenProps<Props>> = (props) => {
    return <View style={screenStyles.container}>
        <Text>Library</Text>
    </View>
}

export default LibraryScreen