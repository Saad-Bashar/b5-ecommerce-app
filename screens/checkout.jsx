import React from 'react'
import { View, SafeAreaView, ScrollView, Image, Pressable } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import Checkbox from '../components/Checkbox';
import Input from '../components/Input';
import Text from '../components/text/text';
import { reset, selectCart, selectTotalAmount } from '../redux/cartSlice';
import { colors, spacing } from '../theme';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Ionicons } from "@expo/vector-icons";
import Button from '../components/Button';
import Modal from 'react-native-modal'
import AnimatedLottieView from 'lottie-react-native';

const SHIPPING_PRICE = 50;
const VAT = 500;

const PriceView = ({title, price, priceStyle}) => {
    return (
        <View style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingVertical: 10,
            marginHorizontal: spacing[3],
            marginBottom: spacing[1]
        }}>
            <Text>
                {title}
            </Text>
            <Text preset="h6" style={[priceStyle]}>{`$${price}`}</Text>
        </View>
    )
}

const schema = Yup.object().shape({
    name: Yup.string().required("You must submit name").min(3, "Name must be at least 3 characters"),
    email: Yup.string().required("You must submit email").email("Email is not valid"),
})

export default function Checkout({ navigation }) {
    const cartItems = useSelector(selectCart)
    const totalPrice = useSelector(selectTotalAmount)
    const dispatch = useDispatch();
    const [isModalVisible, setIsModalVisible] = React.useState(false);

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    }

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            phone: '',
            address: '',
            city: '',
            country: '',
            zip: '',
        },
        // validationSchema: schema,
        onSubmit: values => {
            console.log(values)
            toggleModal()
        },
    })

    
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#f9f9f9' }}>
            <ScrollView>
                <Pressable onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back-sharp" size={24} color="black" style={{margin: spacing[5]}} />
                </Pressable>
                <View style={{
                    padding: spacing[4],
                    borderRadius: 12,
                    backgroundColor: '#fff',
                    margin: spacing[5]
                }}>
                    <Text preset="h6">
                        Checkout
                    </Text>
                    
                    <Text textColor={colors.primary} uppercase style={{ marginTop: spacing[4] }}>
                        Billing details
                    </Text>

                    <Input 
                        label="Name" 
                        placeholder="John doe" 
                        onChangeText={formik.handleChange('name')}
                        onBlur={formik.handleBlur('name')}
                    />

                    {formik.touched.name && formik.errors.name && (
                        <Text style={{ color: 'red', marginTop: 4}}>
                            {formik.errors.name}
                        </Text>
                    )}

                    <Input 
                        label="Email address" 
                        placeholder="john@gmail.com" 
                        onChangeText={formik.handleChange('email')}
                        onBlur={formik.handleBlur('email')}
                    />
                    {formik.touched.email && formik.errors.email && (
                        <Text style={{ color: 'red', marginTop: 4}}>
                            {formik.errors.email}
                        </Text>
                    )}

                    <Input label="Phone number" placeholder="+1823998213" />

                    <Text textColor={colors.primary} uppercase style={{ marginTop: spacing[4] }}>
                        Shipping details
                    </Text>
                    <Input label="Address" placeholder="12 london street" />
                    <Input label="Zip code" placeholder="23213" />
                    <Input label="City" placeholder="London" />
                    <Input label="Country" placeholder="United Kingdom" />

                    <Text textColor={colors.primary} uppercase style={{ marginTop: spacing[4] }}>
                        Payment details
                    </Text>

                    <Checkbox text="Cash on Delivery" selected={true} />
                    <Checkbox text="Online payment (coming soon)" disable={true} />

                </View>

                <View style={{
                    padding: spacing[4],
                    borderRadius: 12,
                    backgroundColor: '#fff',
                    margin: spacing[5]
                }}>
                    <Text preset="h6">
                        Summary
                    </Text>
                    <View style={{ marginTop: spacing[6] }}>
                        {cartItems.map((item, index) => {
                            const {
                                featuredImage,
                                name,
                                quantityPrice,
                                amount,
                            } = item
                            return (
                                <View
                                    key={name}
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        paddingVertical: 10,
                                    }}
                                >
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                        }}
                                    >
                                        <View
                                            style={{
                                                backgroundColor: colors.grey,
                                                borderRadius: 8,
                                                alignItems: "center",
                                                justifyContent: "center",
                                                padding: spacing[5],
                                            }}
                                        >
                                            <Image
                                                style={{
                                                    height: 36,
                                                    width: 36,
                                                }}
                                                resizeMode="contain"
                                                source={featuredImage.source}
                                            />
                                        </View>
                                        <View
                                            style={{ marginLeft: spacing[4] }}
                                        >
                                            <Text preset="title">{name}</Text>
                                            <Text textColor="#757575">
                                                ${quantityPrice}
                                            </Text>
                                        </View>
                                    </View>
                                    <Text textColor="#757575">x{amount}</Text>
                                </View>
                            )
                        })}
                        
                        <View style={{ marginVertical: spacing[5]}}>
                            <PriceView title="Total" price={totalPrice} />
                            <PriceView title="Shipping" price={SHIPPING_PRICE} />
                            <PriceView title="VAT (INCLUDED)" price={VAT} />
                            <PriceView title="Grand total" price={totalPrice + SHIPPING_PRICE + VAT} priceStyle={{ color: colors.primary }} />
                        </View>

                        <Button title="CONTINUE & PAY" fullWidth onPress={formik.handleSubmit} />
                       
                    </View>
                </View>
            </ScrollView>
            {
                isModalVisible && (
                    <Modal isVisible={isModalVisible}>
                        <View style={{
                            backgroundColor: '#fff',
                            padding: spacing[8],
                            borderRadius: 12
                        }}>
                            <AnimatedLottieView 
                                autoPlay
                                style={{ height: 50, width: 50 }}
                                source={require('../assets/images/success.json')}
                            />
                            <Text preset="h5" uppercase>
                                Thank you
                            </Text>
                            <Text preset="h5" uppercase>
                                for your order
                            </Text>
                            <Text textColor="#757575" style={{ paddingVertical: spacing[4] }}>
                                You will recieve an email confirmation shortly
                            </Text>

                            <View style={{
                                backgroundColor: colors.grey,
                                borderTopLeftRadius: 12,
                                borderTopRightRadius: 12,
                                paddingHorizontal: spacing[6],
                                paddingVertical: spacing[4],
                                borderBottomWidth: 1,
                                borderBottomColor: "#979797",
                            }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                        <Image 
                                            style={{ height: 36, width: 36 }}
                                            resizeMode="contain"
                                            source={cartItems[0]?.featuredImage.source}
                                        />
                                        <View style={{ marginTop: spacing[2], marginLeft: spacing[4] }}>
                                            <Text preset="title" >
                                                {cartItems[0]?.name}
                                            </Text>
                                            <Text textColor="#757575">
                                                ${cartItems[0]?.quantityPrice}
                                            </Text>
                                        </View>
                                    </View>
                                   
                                    <Text>
                                        x{cartItems[0]?.amount}
                                    </Text>
                                </View>
                                {
                                    cartItems.length > 1 && (
                                        <View style={{ marginTop: 12}}>
                                            <Text>
                                                and {cartItems.length - 1} more
                                            </Text>
                                        </View>
                                    )
                                }
                            </View>
                            
                            <View
                                style={{
                                    paddingHorizontal: spacing[5],
                                    paddingVertical: spacing[4],
                                    borderBottomLeftRadius: 12,
                                    borderBottomRightRadius: 12,
                                    backgroundColor: "#000",
                                }}
                            >
                                <Text textColor="#fafafa">GRAND TOTAL</Text>
                                <Text
                                    textColor="white"
                                    preset="h5"
                                    style={{ paddingTop: spacing[2] }}
                                >{`$ ${totalPrice + SHIPPING_PRICE + VAT}`}</Text>
                            </View>
                            
                            <Button 
                                title="BACK TO HOME"
                                fullWidth
                                style={{ marginTop: spacing[6] }}
                                onPress={() => {
                                    toggleModal()
                                    dispatch(reset())
                                    navigation.navigate('Home')
                                }}
                            />
                        </View>
                    </Modal>
                )
            }
        </SafeAreaView>
    )
}
