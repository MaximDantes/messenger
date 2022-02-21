import {ScrollView, StyleSheet, View} from 'react-native'
import {screenStyles} from '../styles/common'
import React, {useEffect} from 'react'
import {NavigationProps, ScreenProps} from '../types/screens'
import Member from '../components/Members/Member'
import {useNavigation} from '@react-navigation/native'
import {useDispatch, useSelector} from 'react-redux'
import {getChatMembers} from '../store/chats/chats-thunks'
import {selectChatMembers} from '../store/chats/chats-selectors'

const MembersScreen: React.FC<ScreenProps<'Members'>> = (props) => {
    const chatId = props.route.params.chatId
    const chatName = props.route.params.chatName

    const navigation = useNavigation<NavigationProps>()
    const dispatch = useDispatch()

    const members = useSelector(selectChatMembers(chatId))

    useEffect(() => {
        if (members.length === 0) {
            dispatch(getChatMembers(chatId))
        }

        navigation.setOptions({
            title: chatName
        })
    }, [chatId])

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