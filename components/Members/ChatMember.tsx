import {Image, LayoutAnimation, StyleSheet, Text, TouchableOpacity, UIManager, View} from 'react-native'
import {IUser} from '../../types/entities'
import React, {useEffect, useState} from 'react'

type Props = {
    member: IUser
}

const ChatMember: React.FC<Props> = (props) => {
    const [showInfo, setShowInfo] = useState(false)

    useEffect(() => {
        UIManager.setLayoutAnimationEnabledExperimental(true)
    }, [])

    const toggleShowInfo = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
        setShowInfo(prevState => !prevState)
    }

    return <TouchableOpacity style={styles.container} onPress={toggleShowInfo}>
        <View style={styles.memberContainer}>
            <Image source={{uri: props.member.avatar}} style={styles.avatar}/>
            <Text>{props.member.firstName + ' ' + props.member.lastName}</Text>
        </View>

        {showInfo && <View style={styles.infoContainer}>
            <Text style={styles.infoText}>{props.member.email}</Text>
            <Text style={styles.infoText}>{props.member.phoneNumber}</Text>
        </View>}
    </TouchableOpacity>
}

const styles = StyleSheet.create({
    container: {
        padding: 5,
        backgroundColor: '#E0EFFF',
        borderRadius: 5,
        marginHorizontal: 10,
        marginVertical: 3,
    },

    memberContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    avatar: {
        height: 50,
        width: 50,
        borderRadius: 25,
        marginRight: 10,
    },

    infoContainer: {
        alignItems: 'flex-end',
        marginHorizontal: 5,
    },

    infoText: {
        marginVertical: 5,
    },
})

export default ChatMember