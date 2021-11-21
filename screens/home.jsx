import React, {useEffect} from 'react'
import { View, SafeAreaView, ScrollView, Image, Pressable, ActivityIndicator, useWindowDimensions } from 'react-native'
import BannerTitle from '../components/BannerTitle'
import Text from '../components/text/text'
import { colors, spacing } from '../theme'
import LottieView from 'lottie-react-native'
import { AntDesign } from '@expo/vector-icons'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts, selectFeaturedProducts, selectStatus } from '../redux/productSlice'

const CategoryBox = ({ title, image, onPress }) => {
    return (
        <Pressable
            onPress={onPress}
            style={{
                marginVertical: spacing[8],
                marginHorizontal: spacing[5],
                borderRadius: spacing[4],
                backgroundColor: colors.grey,
                alignItems: 'center',
                padding: spacing[5],
            }}
        >
            <Image 
                style={{ top: -60 }}
                source={image}
            /> 

            <View
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    top: -30
                }}
            >
                <Text preset="h6">
                    {title}
                </Text>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: spacing[4] }}>
                    <Text preset="subtitle" textColor="#7c7c7c" centered style={{ marginRight: spacing[3] }}>
                        SHOP
                    </Text>
                    <AntDesign name="right" color={colors.primary} size={14} />

                </View>
            </View>  
        </Pressable>
    )
}

const FeaturedProduct = ({ name, category, image }) => {
    const windowWidth = useWindowDimensions().width

    return (
        <View style={{
            marginVertical: spacing[5],
            backgroundColor: colors.primary,
            borderRadius: 16,
            alignItems: "center",
            justifyContent: "center",
        }}>
            <View style={{
                borderWidth: 1,
                borderColor: "#d8d8d8",
                borderRadius: 400,
                height: 320,
                width: windowWidth - 40,
                justifyContent: "center",
                alignItems: "center",
            }}>
                <View style={{
                    borderWidth: 1,
                    borderColor: "#d8d8d8",
                    borderRadius: 400,
                    height: 280,
                    width: windowWidth - 80,
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                    <Image 
                        style={{height: 172, width: 188}}
                        resizeMode="contain"
                        source={image.source}
                    />
                </View>
            </View>
            <View style={{ paddingBottom: spacing[8], marginTop: -spacing[6] }}>
                <Text preset="h3" centered uppercase white>
                    {name}
                </Text>
                <Text preset="h3" centered uppercase white>
                    {category}
                </Text>
                <Text centered style={{ width: 250, marginTop: spacing[4]  }} white>
                    Upgrade to premium speakers that are phenomenally 
                    built to deliver truly remarkable sound.
                </Text>
            </View>
        </View>
    )
}


export default function Home({ navigation }) {
    const dispatch = useDispatch()
    const status = useSelector(selectStatus)
    const featuredProducts = useSelector(selectFeaturedProducts)
    useEffect(() => {
        if(status === 'idle') {
            dispatch(fetchProducts())
        }
    }, [])

    if(status === 'loading') {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>
        )
    }

    return (
        <SafeAreaView>
            <ScrollView>
               <BannerTitle /> 
               <View style={{ backgroundColor: colors.black }}>
                    <Image 
                        style={{ alignSelf: 'center', width: '100%' }}
                        resizeMode="cover"
                        source={require('../assets/images/home-banner.png')}
                    />
                    <View style={{ position: 'absolute', width: '100%', top: 200 }}>
                        <Text white preset="h2" centered>
                            Welcome
                        </Text>
                        <Text textColor={colors.grey} centered style={{ width: 250, fontWeight: '300', alignSelf: 'center' }}>
                            Experience natural, lifelike audio and exceptional build quality made for the passionate
							music enthusiast.
                        </Text>

                        <LottieView
                            autoPlay
                            source={require('../assets/images/scroll-down-arrows.json')}
                            style={{ height: 60, width: 60, alignSelf: 'center' }}
                        />
                    </View>
               </View>

               <View style={{ paddingTop: 40 }}>
                    <CategoryBox 
                        title="Headphones" 
                        image={require('../assets/images/home-headphone.png')} 
                        onPress={() => {
                            navigation.navigate('Headphones')
                        }}
                    />

                    <CategoryBox 
                        title="Speakers" 
                        image={require('../assets/images/home-speaker.png')} 
                        onPress={() => {
                            navigation.navigate('Speakers')
                        }}
                    />

                    <CategoryBox 
                        title="Earphones" 
                        image={require('../assets/images/home-earphone.png')} 
                        onPress={() => {
                            navigation.navigate('Earphones')
                        }}
                    />
               </View>

               <View style={{ 
                   paddingVertical: spacing[6],
                   paddingHorizontal: spacing[5],
               }}>
                    <Text preset="h3" centered>
                        FEATURED
                    </Text>
                    <Text preset="h3" centered>
                        PRODUCTS
                    </Text>
                    {
                        featuredProducts.map(product => {
                            const {name, category, featuredImage} = product;
                            return (
                                <FeaturedProduct 
                                    key={name}
                                    name={name}
                                    category={category}
                                    image={featuredImage}
                                />
                            )
                        })
                    }
               </View>
            </ScrollView>
        </SafeAreaView>
    )
}
