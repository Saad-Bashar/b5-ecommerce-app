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

function EarphonesScreen() {
    const earphones : ProductType[] = useSelector(state => selectProductsByCategory(state, "earphones"))  
    return (
        <SafeAreaView style={{flex: 1}}>
            <ScrollView>
                <BannerTitle />
                <CategoryHeader title="earphones" />
                <View  style={{margin: spacing[5]}}>
                {
                        earphones.map(earphone => 
                            <View key={earphone.name} style={{marginBottom: spacing[10]}}>
                                    <View style={{backgroundColor: colors.grey, borderRadius: 16, alignItems: 'center', justifyContent: 'center', paddingVertical: spacing[8]}}>
                                        <Image source={earphone.featuredImage.source} />
                                    </View>
                                    <View style={{marginVertical: spacing[5]}}>
                                        <Text centered preset="h4">{earphone.name}</Text>
                                        <Text centered uppercase preset="h4">earphones</Text>
                                        <Text textColor="#919191" centered style={{marginTop:spacing[5], marginHorizontal:spacing[7]}}>
                                            {earphone.description}
                                        </Text>
                                    </View>
                                    <Button style={{alignSelf: 'center'}} title="SEE PRODUCT" />
                                </View>
                            )

                    }
                </View>
                <BannerFooter />
            </ScrollView>   
        </SafeAreaView>
    )
}

export default EarphonesScreen