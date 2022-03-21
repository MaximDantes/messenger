import React, {useEffect, useState} from 'react'
import {StyleSheet, Text, View} from 'react-native'
import regex from '../../utilits/regex'

type Props = {
    password: string
    setPasswordStrength?(strength: PasswordStrength): void
}

const PasswordStrengthValidator: React.FC<Props> = (props) => {
    const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>('week')

    useEffect(() => {
        if (regex.securePassword.test(props.password)) {
            setPasswordStrength('secure')
            props.setPasswordStrength?.('secure')
            return
        } else if (regex.mediumPassword.test(props.password)) {
            setPasswordStrength('medium')
            props.setPasswordStrength?.('medium')
            return
        } else {
            setPasswordStrength('week')
            props.setPasswordStrength?.('week')
        }
    }, [props.password])

    return <View style={styles.container}>
        <View style={styles.bar}>
            <View style={[styles.item, passwordStrength === 'week' && styles.weakItem]}/>
            <View style={[styles.item, passwordStrength === 'medium' && styles.mediumItem]}/>
            <View style={[styles.item, passwordStrength === 'secure' && styles.secureItem]}/>
        </View>

        <View style={styles.text}>
            <Text>{passwordStrength === 'week' ? 'Слабый' :
                passwordStrength === 'medium' ? 'Средний' : 'Надежный'}</Text>
        </View>
    </View>
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        maxWidth: 260,
    },

    bar: {
        width: '100%',
        height: 8,
        borderRadius: 4,
        backgroundColor: '#cccccc',
        flexDirection: 'row',
        overflow: 'hidden',
    },

    item: {
        flex: 1 / 3,
    },

    weakItem: {
        backgroundColor: '#f00',
    },

    mediumItem: {
        backgroundColor: '#ff0',
    },

    secureItem: {
        backgroundColor: '#0f0',
    },

    text: {
        alignItems: 'center',
    },
})

export default PasswordStrengthValidator

export type PasswordStrength = 'week' | 'medium' | 'secure'
