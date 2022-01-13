import {StyleSheet, Text, View} from 'react-native'
import React from 'react'
import {NativeStackScreenProps} from '@react-navigation/native-stack'

const DocumentsScreen: React.FC<NativeStackScreenProps<{}>> = (props) => {
    //TODO route params types
    //@ts-ignore
    const url = props.route.params.url

    return <View style={styles.container}>
        <Text>{url}</Text>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})

export default DocumentsScreen