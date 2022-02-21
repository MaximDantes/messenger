import React, {useEffect} from 'react'
import {StyleSheet} from 'react-native'
import {NavigationProps, ScreenProps} from '../types/screens'
import {useDispatch, useSelector} from 'react-redux'
import {selectLibraryFetching, selectSpecialities} from '../store/library/library-selectors'
import {getSpecialities} from '../store/library/library-thunks'
import {useNavigation} from '@react-navigation/native'
import ScrollScreen from '../components/common/ScrollScreen'
import LibraryCard from '../components/Library/LibraryCard'

const LibrarySpecialitiesScreen: React.FC<ScreenProps<'LibrarySpecialities'>> = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation<NavigationProps>()

    const specialities = useSelector(selectSpecialities)
    const isFetching = useSelector(selectLibraryFetching)

    useEffect(() => {
        specialities.length === 0 && dispatch(getSpecialities())
    }, [])

    return <ScrollScreen isFetching={isFetching}>
        {specialities.map(item => (
            <LibraryCard
                key={item.id}
                style={styles.item}
                onPress={() => navigation.navigate('LibraryYears', {speciality: item})}
                text={item.abbreviation}
            />
        ))}
    </ScrollScreen>
}

const styles = StyleSheet.create({
    item: {
        marginVertical: 20,
    },
})

export default LibrarySpecialitiesScreen