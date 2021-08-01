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
import CartScreen from "../screens/CartScreen";
import EarphonesScreen from "../screens/EarphonesScreen";
import HeadphonesScreen from "../screens/HeadphonesScreen";
import HomeScreen from "../screens/HomeScreen";
import SpeakersScreen from "../screens/SpeakersScreen";
import { colors } from "../theme";

const BottomTab = createBottomTabNavigator<any>();

export default function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      tabBarOptions={{ activeTintColor: colors.primary, }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
        
        
      />
      <BottomTab.Screen
        name="Headphones"
        component={HeadphonesScreen}
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
        component={SpeakersScreen}
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
        component={EarphonesScreen}
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
