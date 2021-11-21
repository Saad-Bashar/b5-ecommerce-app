import React from 'react'
import { View, SafeAreaView, ScrollView, Image } from 'react-native'
import { useSelector } from 'react-redux'
import BannerTitle from '../components/BannerTitle'
import Button from '../components/Button'
import Footer from '../components/CategoryFooter'
import CategoryTitle from '../components/CategoryTitle'
import Text from '../components/text/text'
import { selectHeadphones } from '../redux/productSlice'
import { colors, spacing } from '../theme'

export default function Headphones({ navigation }) {
    const headphones = useSelector(selectHeadphones)
    const onPressProduct = (id) => {
        navigation.navigate('ProductDetails', {id: id})
    }
    return (
        <SafeAreaView>
            <ScrollView>
                <BannerTitle />
                <CategoryTitle title="headphones" />
                <View style={{ margin: spacing[5] }}>
                    {
                        headphones.map(headphone => {
                            return (
                                <View key={headphone.name} style={{ marginBottom: 60 }}>
                                    <View
                                        style={{
                                            backgroundColor: colors.grey,
                                            borderRadius: 16,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            paddingVertical: spacing[5],
                                        }}
                                    >
                                        <Image source={headphone.featuredImage.source} />
                                    </View>

                                    <View style={{ marginTop: spacing[5] }}>
                                        <Text preset="h4" centered>
                                            {headphone.name}
                                        </Text>
                                        <Text preset="h4" centered uppercase>
                                            headphones
                                        </Text>
                                        <Text
                                            textColor="#919191"
                                            centered
                                            style={{
                                                marginTop: spacing[5],
                                                marginHorizontal: spacing[7],
                                            }}
                                        >
                                            {headphone.description}
                                        </Text>
                                    </View>

                                    <Button
                                        style={{ alignSelf: 'center', marginTop: spacing[5] }}
                                        title="SEE PRODUCT"
                                        onPress={() => onPressProduct(headphone.id)}
                                    />
                                </View>
                            )
                        })
                    }

                    <Footer />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
