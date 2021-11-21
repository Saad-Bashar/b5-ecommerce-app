import React from 'react'
import { View, SafeAreaView, ScrollView, Pressable, Image, Alert } from 'react-native'
import { colors, spacing } from '../theme'
import LottieView from 'lottie-react-native'
import { useSelector, useDispatch } from 'react-redux'
import { addToCart, deleteFromCart, reset, selectCart, selectTotalAmount } from '../redux/cartSlice'
import Text from '../components/text/text'
import CounterButton from '../components/CounterButton'
import Button from '../components/Button'

export default function Cart({ navigation }) {
    const cart = useSelector(selectCart)
    const totalAmount = useSelector(selectTotalAmount)
    const dispatch = useDispatch()

    if(cart.length === 0) {
        return (
            <View style={{ flex: 1, margin: spacing[5]}}>
                <LottieView 
                    autoPlay
                    style={{ alignSelf: 'center' }}
                    loop={false}
                    source={require('../assets/images/empty-cart.json')}
                />
            </View>
        )
        
    }

    const onAmountChange = (value, cartItem) => {
        if(value === 0) {
            return Alert.alert(
                'Remove item?',
                'Do you want to remove the item from your cart?',
                [
                    {
                        text: 'Cancel',
                        onPress: () => {},
                        style: 'cancel'
                    },
                    {
                        text: 'Confirm',
                        onPress: () => {
                            dispatch(deleteFromCart({id: cartItem.id}))
                        },
                    }
                ]

            ) 
        }

        
        const cartProduct = {
            ...cartItem,
            quantityPrice: value * cartItem.price,
            amount: value
        }

        dispatch(addToCart({cartProduct}))
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
                <View style={{ flex: 1, margin: spacing[5] }}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                        <Text preset='h6'>
                            {`Cart (${cart.length})`} 
                        </Text>
                        <Pressable
                            onPress={() => dispatch(reset())}
                        >
                            <Text
                                textColor="#757575"
                                centered
                                style={{ textDecorationLine: 'underline', fontWeight: 'bold' }}
                            >
                                Remove all
                            </Text>
                        </Pressable>
                    </View>
                    
                    <View style={{ marginVertical: spacing[5]}}>
                        {
                            cart.map(item => {
                                const {featuredImage, name, quantityPrice, amount} = item
                                return (
                                    <View 
                                        key={item.id}
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            padding: spacing[2]
                                        }}
                                    >
                                        <View
                                            style={{
                                                backgroundColor: colors.grey,
                                                borderRadius: 12,
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                padding: spacing[5]
                                            }}
                                        >
                                            <Image 
                                                source={featuredImage.source} 
                                                style={{ height: 36, width: 36 }}
                                                resizeMode="contain"
                                            />
                                        </View>

                                        <View style={{ flex: 1, marginLeft: spacing[5] }}>
                                            <Text preset="h6">{name}</Text>
                                            <Text>
                                                {`$${quantityPrice}`}
                                            </Text>
                                        </View>

                                        <CounterButton 
                                            initialVal={amount}
                                            setAmount={(value) => {
                                                onAmountChange(value, item)
                                            }}
                                        />
                                    </View>
                                )
                            })
                        }
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                margin: spacing[5]
                            }}
                        >
                            <Text preset="h6">
                                Total
                            </Text>

                            <Text preset="h5">
                                {`$${totalAmount}`}
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={{ flex: 1, justifyContent: 'flex-end', margin: spacing[5] }}>
                    <Button 
                        title="CHECKOUT" 
                        style={{ width: '100%' }} 
                        onPress={() => {navigation.navigate('Checkout')}}
                    />
                </View>
            </ScrollView>

        </SafeAreaView>
    )
}
