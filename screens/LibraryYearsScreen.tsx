import React, {useEffect} from 'react'
import {NavigationProps, ScreenProps} from '../types/screens'
import {StyleSheet} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import ScrollScreen from '../components/common/ScrollScreen'
import LibraryCard from '../components/Library/LibraryCard'

const LibraryYearsScreen: React.FC<ScreenProps<'LibraryYears'>> = (props) => {
    const speciality = props.route.params.speciality

    const navigation = useNavigation<NavigationProps>()

    useEffect(() => {
        navigation.setOptions({
            title: speciality.abbreviation
        })
    }, [speciality])

    return <ScrollScreen>
        {[...Array(speciality.years)].map((item, index) => (
            <LibraryCard
                key={index}
                style={styles.item}
                onPress={() => navigation.navigate('LibrarySubjects', {speciality: speciality, year: index + 1})}
                text={`${index + 1} курс`}
            />
        ))}
    </ScrollScreen>
}

const styles = StyleSheet.create({
    item: {
        marginVertical: 30,
    },
})

export default LibraryYearsScreen