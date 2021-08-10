/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import {
  Ionicons,
  MaterialCommunityIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { useSelector } from "react-redux";
import { selectCartLength } from "../redux/cartSlice";
import CartScreen from "../screens/CartScreen";
import EarphonesScreen from "../screens/EarphonesScreen";
import HeadphonesScreen from "../screens/HeadphonesScreen";
import HomeScreen from "../screens/HomeScreen";
import ProductDetailsScreen from "../screens/ProductDetailsScreen";
import SpeakersScreen from "../screens/SpeakersScreen";
import { colors } from "../theme";

const BottomTab = createBottomTabNavigator<any>();

const HomeStack = createStackNavigator();
function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Home" component={HomeScreen} />
    </HomeStack.Navigator>
  );
}

const HeadphonesStack = createStackNavigator();
function HeadphonesStackScreen() {
  return (
    <HeadphonesStack.Navigator screenOptions={{ headerShown: false }}>
      <HeadphonesStack.Screen name="Headphones" component={HeadphonesScreen} />
      <HeadphonesStack.Screen name="ProductDetails" component={ProductDetailsScreen} />
    </HeadphonesStack.Navigator>
  );
}

const SpeakersStack = createStackNavigator();
function SpeakersStackScreen() {
  return (
    <SpeakersStack.Navigator screenOptions={{ headerShown: false }}>
      <SpeakersStack.Screen name="Speakers" component={SpeakersScreen} />
      <SpeakersStack.Screen name="ProductDetails" component={ProductDetailsScreen} />
    </SpeakersStack.Navigator>
  );
}

const EarphonesStack = createStackNavigator();
function EarphonesStackScreen() {
  return (
    <EarphonesStack.Navigator screenOptions={{ headerShown: false }}>
      <EarphonesStack.Screen name="Speakers" component={EarphonesScreen} />
      <EarphonesStack.Screen name="ProductDetails" component={ProductDetailsScreen} />
    </EarphonesStack.Navigator>
  );
}

export default function BottomTabNavigator() {
  const total = useSelector(selectCartLength)
  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      tabBarOptions={{ activeTintColor: colors.primary, }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
        
        
      />
      <BottomTab.Screen
        name="Headphones"
        component={HeadphonesStackScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon
              fontFamily="MaterialCommunityIcons"
              name="headphones"
              color={color}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Speakers"
        component={SpeakersStackScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon
              fontFamily="MaterialCommunityIcons"
              name="speaker"
              color={color}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Earphones"
        component={EarphonesStackScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon
              fontFamily="SimpleLineIcons"
              name="earphones-alt"
              color={color}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="cart-outline" color={color} />
          ),
          tabBarBadge: total
        }}
      />
    </BottomTab.Navigator>
  );
}


function TabBarIcon({
  fontFamily,
  name,
  color,
}: {
  fontFamily?: string;
  name: any;
  color: string;
}) {
  if (fontFamily === "MaterialCommunityIcons") {
    return (
      <MaterialCommunityIcons
        color={color}
        style={{ marginBottom: -3 }}
        size={24}
        name={name}
      />
    );
  } else if (fontFamily === "SimpleLineIcons") {
    return (
      <SimpleLineIcons
        color={color}
        style={{ marginBottom: -3 }}
        size={24}
        name={name}
      />
    );
  } else {
    return (
      <Ionicons
        color={color}
        size={24}
        style={{ marginBottom: -3 }}
        name={name}
      />
    );
  }
}
