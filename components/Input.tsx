import React from 'react'
import { View, TextInput, StyleSheet } from 'react-native'
import { spacing } from '../theme'
import Text from './text/text'

export default function Input({label, placeholder}: {label: string, placeholder: string}) {
    return (
        <View style={{paddingVertical: spacing[3]}}>
            <Text preset="subtitle" style={{paddingBottom: 10}}>{label}</Text>
            <TextInput 
                placeholder={placeholder}
                style={styles.input}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: '#CFCFCF',
        borderRadius: 8,
        padding: 15
    }
})
