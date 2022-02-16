import React, {useEffect} from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {screenStyles} from '../styles/common'
import {NavigationProps, ScreenProps} from '../types/screens'
import {useDispatch, useSelector} from 'react-redux'
import {selectSpecialities} from '../selectors/specialities-selectors'
import {getSpecialities} from '../store/specialities/specialities-thunks'
import {useNavigation} from '@react-navigation/native'
import {ISpeciality} from '../types/entities'

const LibraryScreen: React.FC<ScreenProps<'Library'>> = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation<NavigationProps>()

    useEffect(() => {
        dispatch(getSpecialities())
    }, [])

    const specialities = useSelector(selectSpecialities)

    const showSpecialityScreen = (speciality: ISpeciality) => {
        navigation.navigate('LibrarySpeciality', {speciality})
    }

    return <View style={[styles.container, screenStyles.container]}>
        {specialities.map(item => (
            <TouchableOpacity
                key={item.id}
                style={styles.item}
                onPress={() => showSpecialityScreen(item)}
            >
                <Text>{item.abbreviation}</Text>
            </TouchableOpacity>
        ))}
    </View>
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 50,
    },

    item: {
        width: '100%',
        marginVertical: 50,
        backgroundColor: '#00000066',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
})

export default LibraryScreen