import React, {useEffect} from 'react'
import {NavigationProps, ScreenProps} from '../types/screens'
import {StyleSheet, Text, View} from 'react-native'
import {screenStyles} from '../styles/common'
import {useNavigation} from '@react-navigation/native'
import {useDispatch, useSelector} from 'react-redux'
import {selectProfile} from '../selectors/profile-selectors'
import {Picker} from '@react-native-picker/picker'
import {getArticles} from '../store/articles/articles-thunks'
import {selectArticles} from '../selectors/articles-selectors'

const LibrarySpecialityScreen: React.FC<ScreenProps<'LibrarySpeciality'>> = (props) => {
    const speciality = props.route.params.speciality

    const navigation = useNavigation<NavigationProps>()
    const dispatch = useDispatch()

    const profile = useSelector(selectProfile)
    const articles = useSelector(selectArticles(profile?.specialityId, profile?.courseId))

    useEffect(() => {
        navigation.setOptions({
            title: speciality.abbreviation
        })
    }, [speciality])

    useEffect(() => {
        if (profile) {
            dispatch(getArticles(speciality.id, profile.courseId))
        }
    }, [profile, speciality])

    return <View style={[screenStyles.container]}>
        {articles.map(item => (
            <Text key={item.id}>{item.title}</Text>
        ))}

        <Picker>
            <Picker.Item label={'frfr'}/>
        </Picker>
    </View>
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-end',
    },
})

export default LibrarySpecialityScreen