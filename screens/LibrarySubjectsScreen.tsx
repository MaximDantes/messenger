import React, {useEffect} from 'react'
import {NavigationProps, ScreenProps} from '../types/screens'
import {useNavigation} from '@react-navigation/native'
import {useDispatch, useSelector} from 'react-redux'
import {getSubjects} from '../store/library/library-thunks'
import {selectLibraryFetching, selectSubjects} from '../store/library/library-selectors'
import ScrollScreen from '../components/common/ScrollScreen'
import LibraryCard from '../components/Library/LibraryCard'

const LibrarySubjectsScreen: React.FC<ScreenProps<'LibrarySubjects'>> = (props) => {
    const speciality = props.route.params.speciality
    const year = props.route.params.year

    const navigation = useNavigation<NavigationProps>()
    const dispatch = useDispatch()

    const subjects = useSelector(selectSubjects)
    const isFetching = useSelector(selectLibraryFetching)

    useEffect(() => {
        dispatch(getSubjects(speciality.id, year))

        navigation.setOptions({
            title: `${speciality.abbreviation} ${year} курс`
        })
    }, [speciality, year])


    return <ScrollScreen isFetching={isFetching}>
        {subjects.map(item => (
            <LibraryCard
                key={item.id}
                onPress={() => navigation.navigate('LibraryArticles',
                    {subject: item, specialityId: speciality.id, year: year})}
                text={item.title}
            />
        ))}
    </ScrollScreen>
}

export default LibrarySubjectsScreen