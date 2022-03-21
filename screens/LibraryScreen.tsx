import React, {useEffect} from 'react'
import {LibraryNavigatorParamsList, NavigationProps, ScreenProps} from '../types/screens'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import LibrarySubjectsScreen from './LibrarySubjectsScreen'
import LibraryArticlesScreen from './LibraryArticlesScreen'
import {useSelector} from 'react-redux'
import {selectProfile} from '../store/profile/profile-selectors'
import LibrarySpecialitiesScreen from './LibrarySpecialitiesScreen'
import LibraryYearsScreen from './LibraryYearsScreen'
import {useNavigation} from '@react-navigation/native'

const Stack = createNativeStackNavigator<LibraryNavigatorParamsList>()

const LibraryScreen: React.FC<ScreenProps<'Library'>> = () => {
    const navigation = useNavigation<NavigationProps>()

    const profile = useSelector(selectProfile)

    useEffect(() => {
        if (profile && profile.groupName === 'student') {
            //TODO speciality name
            navigation.navigate('LibrarySubjects', {year: profile.year, speciality: {id: profile.speciality, abbreviation: 'TODO'}})
        }
    }, [profile])

    return <Stack.Navigator>
        <Stack.Screen
            name={'LibrarySpecialities'}
            component={LibrarySpecialitiesScreen}
            options={{title: 'Вики'}}
        />
        <Stack.Screen
            name={'LibraryYears'}
            component={LibraryYearsScreen}
            options={{title: 'Курсы'}}
        />
        <Stack.Screen
            name={'LibrarySubjects'}
            component={LibrarySubjectsScreen}
            options={{title: 'Предметы'}}
        />
        <Stack.Screen
            name={'LibraryArticles'}
            component={LibraryArticlesScreen}
            options={{title: 'Записи'}}
        />
    </Stack.Navigator>
}


export default LibraryScreen