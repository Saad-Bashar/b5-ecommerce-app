import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from 'react';
import { colors } from '../theme';
import Home from '../screens/home';
import Headphones from '../screens/headphones';
import Earphones from '../screens/earphones';
import Speakers from '../screens/speakers';
import Cart from '../screens/cart';
import Checkout from '../screens/checkout';
import ProductDetails from '../screens/product-details';
import { Ionicons, MaterialCommunityIcons, SimpleLineIcons } from "@expo/vector-icons";
import { useSelector } from 'react-redux';
import { selectCartLength } from '../redux/cartSlice';

const THEME = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
  },
};

export default function Navigation() {
  return (
    <NavigationContainer theme={THEME}>
      <BottomTabNavigator />
    </NavigationContainer>
  );
}

const BottomTab = createBottomTabNavigator();
function BottomTabNavigator() {
  const cartLength = useSelector(selectCartLength)
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{ activeTintColor: colors.primary }}
    >
      <BottomTab.Screen 
        name="Home" 
        component={HomeStackScreens} 
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon fontFamily="Ionicons" name="home" color={color} />
        }}
      />
      <BottomTab.Screen 
        name="Headphones" 
        component={HeadphonesStackScreens} 
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon fontFamily="MaterialCommunityIcons" name="headphones" color={color} />
        }}
      /> 
      <BottomTab.Screen 
        name="Speakers" 
        component={SpeakersStackScreens} 
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon fontFamily="MaterialCommunityIcons" name="speaker" color={color} />
        }}
      />   
      <BottomTab.Screen 
        name="Earphones" 
        component={EarphonesStackScreens} 
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon fontFamily="SimpleLineIcons" name="earphones-alt" color={color} />,
        }}
      />   
      <BottomTab.Screen 
        name="Cart" 
        component={CartStackScreens} 
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon fontFamily="Ionicons" name="cart-outline" color={color} />,
          tabBarBadge: cartLength > 0 ? cartLength : null
        }}
        
      />   
    </BottomTab.Navigator>
  )
}

function TabBarIcon({fontFamily, name, color}) {
  if(fontFamily === 'MaterialCommunityIcons') {
    return <MaterialCommunityIcons name={name} size={24} color={color} />
  } else if (fontFamily === 'Ionicons') {
    return <Ionicons name={name} size={24} color={color} />
  } else if (fontFamily === 'SimpleLineIcons') {
    return <SimpleLineIcons name={name} size={24} color={color} />
  } 
}


const HomeStack = createStackNavigator();
function HomeStackScreens() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Home" component={Home} />
    </HomeStack.Navigator>
  )
}


const HeadphonesStack = createStackNavigator();
function HeadphonesStackScreens() {
  return (
    <HeadphonesStack.Navigator screenOptions={{ headerShown: false }}>
      <HeadphonesStack.Screen name="Headphones" component={Headphones} />
      <HeadphonesStack.Screen name="ProductDetails" component={ProductDetails} />
    </HeadphonesStack.Navigator>
  )
}

const EarphonesStack = createStackNavigator();
function EarphonesStackScreens() {
  return (
    <EarphonesStack.Navigator screenOptions={{ headerShown: false }}>
      <EarphonesStack.Screen name="Earphones" component={Earphones} />
      <EarphonesStack.Screen name="ProductDetails" component={ProductDetails} />
    </EarphonesStack.Navigator>
  )
}

const SpeakersStack = createStackNavigator();
function SpeakersStackScreens() {
  return (
    <SpeakersStack.Navigator screenOptions={{ headerShown: false }}>
      <SpeakersStack.Screen name="Speakers" component={Speakers} />
      <SpeakersStack.Screen name="ProductDetails" component={ProductDetails} />
    </SpeakersStack.Navigator>
  )
}

const CartStack = createStackNavigator();
function CartStackScreens() {
  return (
    <CartStack.Navigator screenOptions={{ headerShown: false }}>
      <CartStack.Screen name="Cart" component={Cart} />
      <CartStack.Screen name="Checkout" component={Checkout} />
    </CartStack.Navigator>
  )
}