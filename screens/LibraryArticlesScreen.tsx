import React, {useEffect, useState} from 'react'
import {NavigationProps, ScreenProps} from '../types/screens'
import {Dimensions, ScrollView, StyleSheet, View} from 'react-native'
import {screenStyles} from '../styles/common'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigation} from '@react-navigation/native'
import {getArticlesPreviews} from '../store/articles/articles-thunks'
import {selectArticlesPreviews} from '../store/articles/articles-selectors'
import ArticlePreview from '../components/Articles/ArticlePreview'
import {Picker} from '@react-native-picker/picker'
import {getTeachers} from '../store/library/library-thunks'
import {selectLibraryFetching, selectTeachers} from '../store/library/library-selectors'
import {Preloader} from '../components/common/Preloader'

const LibraryArticlesScreen: React.FC<ScreenProps<'LibraryArticles'>> = (props) => {
    const subject = props.route.params.subject
    const year = props.route.params.year
    const specialityId = props.route.params.specialityId

    const dispatch = useDispatch()
    const navigation = useNavigation<NavigationProps>()

    const articlesPreviews = useSelector(selectArticlesPreviews)
    const teachers = useSelector(selectTeachers)
    const isFetching = useSelector(selectLibraryFetching)

    const [selectedTeacherEmail, setSelectedTeacherEmail] = useState('')

    useEffect(() => {
        dispatch(getArticlesPreviews(specialityId, year, subject.id))
        dispatch(getTeachers(specialityId, year, subject.id))

        navigation.setOptions({
            title: subject.title
        })
    }, [subject, year, specialityId])

    const onTeacherSelect = (teacherEmail: string) => {
        setSelectedTeacherEmail(teacherEmail)
        dispatch(getArticlesPreviews(specialityId, year, subject.id, teacherEmail))
    }

    return isFetching ?
        <Preloader/>
        :
        <View style={[screenStyles.container]}>
        <ScrollView>
            <View style={styles.container}>
                {articlesPreviews.map(item => (
                    <View key={item.id} style={styles.item}>
                        <ArticlePreview articlePreview={item}/>
                    </View>
                ))}
            </View>
        </ScrollView>

        <Picker selectedValue={selectedTeacherEmail} onValueChange={onTeacherSelect}>
            <Picker.Item label={'Все'} value={''}/>
            {teachers.map(item => (
                <Picker.Item key={item.email} value={item.email} label={`${item.firstName} ${item.lastName}`}/>
            ))}
        </Picker>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        padding: 5,
    },

    item: {
        width: '50%',
        height: Dimensions.get('window').width / 2,
        padding: 5,
    },
})

export default LibraryArticlesScreen