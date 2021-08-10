import React from 'react'
import { View, SafeAreaView, Image, ScrollView } from 'react-native'
import Text from '../components/text/text'
import BannerTitle from '../components/BannerTitle'
import CategoryHeader from '../components/CategoryHeader'
import { colors, spacing } from '../theme'
import Button from '../components/Button'
import BannerFooter from '../components/BannerFooter'
import { useSelector } from 'react-redux'
import { selectProductsByCategory } from '../redux/productsSlice'
import { ProductType } from '../data/products'
import { StackNavigationProp } from '@react-navigation/stack'

function SpeakersScreen({navigation}: {navigation: StackNavigationProp<any>}) {    
    const speakers : ProductType[] = useSelector(state => selectProductsByCategory(state, "speakers"))
    return (
        <SafeAreaView style={{flex: 1}}>
            <ScrollView>
                <BannerTitle />
                <CategoryHeader title="speakers" />
                <View  style={{margin: spacing[5]}}>
                {
                        speakers.map(speaker => 
                            <View key={speaker.name} style={{marginBottom: spacing[10]}}>
                                    <View style={{backgroundColor: colors.grey, borderRadius: 16, alignItems: 'center', justifyContent: 'center', paddingVertical: spacing[8]}}>
                                        <Image source={speaker.featuredImage.source} />
                                    </View>
                                    <View style={{marginVertical: spacing[5]}}>
                                        <Text centered preset="h4">{speaker.name}</Text>
                                        <Text centered uppercase preset="h4">speakers</Text>
                                        <Text textColor="#919191" centered style={{marginTop:spacing[5], marginHorizontal:spacing[7]}}>
                                            {speaker.description}
                                        </Text>
                                    </View>
                                    <Button 
                                        onPress={() => navigation.navigate('ProductDetails', {id: speaker.id})} 
                                        style={{alignSelf: 'center'}} 
                                        title="SEE PRODUCT" 
                                    />
                                </View>
                            )
                    }
                </View>
                <BannerFooter />
            </ScrollView>   
        </SafeAreaView>
    )
}

export default SpeakersScreen