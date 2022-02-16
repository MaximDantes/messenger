import {ScrollView, StyleSheet, View} from 'react-native'
import {screenStyles} from '../styles/common'
import React, {useEffect} from 'react'
import {NavigationProps, ScreenProps} from '../types/screens'
import Member from '../components/Members/Member'
import {useNavigation} from '@react-navigation/native'

const MembersScreen: React.FC<ScreenProps<'Members'>> = (props) => {
    const members = props.route.params.members
    const chatName = props.route.params.chatName

    const navigation = useNavigation<NavigationProps>()

    useEffect(() => {
        navigation.setOptions({
            title: chatName
        })
    }, [members])

    return <View style={[screenStyles.container, styles.container]}>
        <ScrollView>
            {members.map(item => (
                <Member key={item.id} member={item}/>
            ))}
        </ScrollView>
    </View>
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 5,
    }
})

export default MembersScreen