import React from 'react'
import { View } from 'react-native'
import { colors, spacing } from '../theme'
import Text from './text/text'

export default function CategoryHeader({title}: {title: string}) {
    return (
        <View style={{backgroundColor: colors.black, alignItems: 'center', justifyContent: 'center', paddingVertical: 10, borderTopWidth: 1,borderTopColor: "#121212" }}>
            <Text style={{textTransform: 'uppercase'}} white preset="h4">{title}</Text>
        </View>
    )
}
