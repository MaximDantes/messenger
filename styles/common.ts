import {StyleSheet} from 'react-native'

export const screenStyles = StyleSheet.create({
    container: {
        flex: 1,
    }
})

export const headerStyles = StyleSheet.create({
    iconsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    stackIconsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: -12,
    },

    icon: {
        marginRight: 12,
    },

    back: {
        marginRight: 30,
    }
})

export const changeScreenStyles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },

    formContainer: {
        marginVertical: 20,
        alignItems: 'center',
    },

    buttonContainer: {
        width: '100%',
        marginVertical: 25,
        maxWidth: 150,
        alignItems: 'center',
    },

    input: {
        fontSize: 16,
    },

    inputContainer: {
        minWidth: 300,
        maxWidth: '90%',
    },

    text: {
        fontSize: 16,
        maxWidth: 280,
        textAlign: 'center',
    }
})