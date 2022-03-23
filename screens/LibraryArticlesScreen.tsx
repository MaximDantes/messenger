import React, {useEffect, useState} from 'react'
import {NavigationProps, ScreenProps} from '../types/screens'
import {Dimensions, ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native'
import {headerStyles, screenStyles} from '../styles/common'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigation} from '@react-navigation/native'
import {getArticlesPreviews} from '../store/articles/articles-thunks'
import {selectArticlesFetching, selectArticlesPreviews} from '../store/articles/articles-selectors'
import ArticlePreview from '../components/Articles/ArticlePreview'
import {Picker} from '@react-native-picker/picker'
import {getTeachers} from '../store/library/library-thunks'
import {selectLibraryFetching, selectTeachers} from '../store/library/library-selectors'
import {Preloader} from '../components/common/Preloader'
import {selectProfile} from '../store/profile/profile-selectors'
import Ionicons from 'react-native-vector-icons/Ionicons'

const LibraryArticlesScreen: React.FC<ScreenProps<'LibraryArticles'>> = (props) => {
    const subject = props.route.params.subject
    const year = props.route.params.year
    const specialityId = props.route.params.specialityId

    const dispatch = useDispatch()
    const navigation = useNavigation<NavigationProps>()

    const articlesPreviews = useSelector(selectArticlesPreviews)
    const teachers = useSelector(selectTeachers)
    const libraryFetching = useSelector(selectLibraryFetching)
    const articlesFetching = useSelector(selectArticlesFetching)
    const profile = useSelector(selectProfile)

    const [selectedTeacherEmail, setSelectedTeacherEmail] = useState('')

    useEffect(() => {
        dispatch(getArticlesPreviews(specialityId, year, subject.id))
        dispatch(getTeachers(specialityId, year, subject.id))

        navigation.setOptions({
            title: subject.title,
        })

        if (profile?.groupName === 'teacher' && profile.subjects && profile.subjects.includes(subject.id)) {
            navigation.setOptions({
                headerRight: () => (
                    <View style={headerStyles.stackIconsContainer}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('ArticleForm', {year, specialityId, subjectId: subject.id})}
                        >
                            <Ionicons name={'add'} color={'#0976FF'} size={30} style={headerStyles.icon}/>
                        </TouchableOpacity>
                    </View>
                )
            })
        }
    }, [subject, year, specialityId, profile])

    const onTeacherSelect = (teacherEmail: string) => {
        setSelectedTeacherEmail(teacherEmail)
        dispatch(getArticlesPreviews(specialityId, year, subject.id, teacherEmail))
    }

    return (libraryFetching || articlesFetching) ?
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