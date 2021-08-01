import React from 'react'
import { View, SafeAreaView, Pressable, Image, StyleSheet, useWindowDimensions, ScrollView } from 'react-native'
import Text from '../components/text/text'
import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement, selectCount } from '../redux/counterSlice'
import BannerTitle from '../components/BannerTitle'
import { colors, spacing } from '../theme'
import { AntDesign } from '@expo/vector-icons'
import { ImageSourcePropType } from 'react-native'
import LottieView from 'lottie-react-native';

const FeatureBox = ({title, image}: {title: string, image: ImageSourcePropType}) => {
    return (
        <View style={{ margin: spacing[8], marginHorizontal: spacing[5], borderRadius: 16, backgroundColor: colors.grey, alignItems: 'center', padding: spacing[5]}}>
            <Image style={{top: -60}} source={image} />
            <View style={{marginTop: -30, alignItems: 'center', justifyContent: 'center'}}>
                <Text preset="h6">{title}</Text>
                <View style={{flexDirection: 'row', alignItems: 'center', marginTop: spacing[2]}}>
                    <Text textColor={"#7C7C7C"} centered style={{marginRight: spacing[3]}}  preset="subtitle">SHOP</Text>
                    <AntDesign name="right" color={colors.primary} size={14} />
                </View>
            </View>
            
        </View>
    )
}


export default function HomeScreen() {
    const count = useSelector(selectCount)
    const dispatch = useDispatch()
    const windowWidth = useWindowDimensions().width;
    const windowHeight = useWindowDimensions().height;
    return (
        <SafeAreaView>
            <ScrollView>
                <BannerTitle />
                <View style={{backgroundColor: colors.black}}>
                    <Image style={{ alignSelf: 'center', width: "100%", aspectRatio: 577.6 / 722  }} resizeMode="contain"  source={require('../assets/images/home-banner.png')} />
                    <View style={{position: 'absolute', top: 200, width: "100%"}}>
                        <Text white preset="h2" style={{textAlign: 'center'}}>Welcome</Text>
                        <Text textColor={colors.grey} style={{fontWeight: '300',textAlign: 'center', width: 250, alignSelf: 'center'}}>
                            Experience natural, lifelike audio and exceptional build quality made for the passionate music enthusiast.
                        </Text>
                        <View>
                            <Text preset="subtitle" centered style={{marginTop:spacing[2]}} textColor={colors.primary}>scroll down</Text>
                            {/* <AntDesign name="down" style={{ alignSelf: 'center',marginTop: spacing[2]}} color={colors.primary} size={14} /> */}
                            <LottieView
                                autoPlay
                                style={{height: 60, width: 60, alignSelf: 'center'}}
                                source={require('../assets/images/scroll-down-arrows.json')}
                            />
                        </View>
                        
                    </View>
                </View>

                <View style={{paddingTop: 64}}>
                    <FeatureBox title={"HEADPHONES"} image={require('../assets/images/home-headphone.png')} />
                    <FeatureBox title={"SPEAKERS"} image={require('../assets/images/home-speaker.png')} />
                    <FeatureBox title={"EARPHONES"} image={require('../assets/images/home-earphone.png')} />
                </View>
            </ScrollView>
           
            {/* <Text>Home</Text>
            <Text>{count}</Text>
            <Pressable onPress={() =>dispatch(increment())}><Text>Increment</Text></Pressable>
            <Pressable onPress={() =>dispatch(decrement())}><Text>Decrement</Text></Pressable> */}
        </SafeAreaView>
    )
}
