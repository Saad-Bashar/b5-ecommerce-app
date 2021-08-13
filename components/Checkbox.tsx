import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { colors, spacing } from '../theme'
import Text from './text/text'

export default function Checkbox({selected, text, disable}: {selected: boolean, text: string, disable?: boolean}) {
    return (
        <TouchableOpacity onPress={() => {}} disabled={disable} style={[styles.wrapper, selected && styles.selected, disable && styles.disabled]}>
            <View style={styles.outerCircle}>
                <View style={[styles.innerCircle, selected && {backgroundColor: colors.primary}]} />
            </View>
            <Text style={{ marginLeft: spacing[4]}} preset="subtitle">
                {text}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        padding: 15,
        borderRadius: 8,
        flexDirection: 'row', 
        alignItems: 'center',
        marginVertical: spacing[2], 
        borderWidth: 1,
        borderColor: '#cfcfcf'
    },
    outerCircle: {
        height: 20, 
        width: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#cfcfcf",
        justifyContent: 'center',
        alignItems: 'center',
    },
    disabled: {
        opacity: 0.3,
    },
    innerCircle: {
        height: 10,
        width: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#cfcfcf"
    },
    selected: {
        borderWidth: 1,
        borderColor: colors.primary
    }
})
