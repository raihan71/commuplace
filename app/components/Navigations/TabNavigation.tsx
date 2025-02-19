import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import colors from '@/app/constants/colors';
import Home from '@/app/screens/Home';
import AddProduct from '@/app/screens/Product/AddProduct';

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 53,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarActiveTintColor: colors.primary,
          tabBarLabel: ({ color }) => (
            <Text
              style={{
                color: color,
                fontSize: 12,
                marginLeft: 2,
              }}>
              Home
            </Text>
          ),
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="AddProduct"
        component={AddProduct}
        options={{
          tabBarActiveTintColor: colors.primary,
          tabBarLabel: ({ color }) => (
            <Text
              style={{
                color: color,
                fontSize: 12,
                marginLeft: 2,
              }}>
              Product
            </Text>
          ),
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'camera' : 'camera-outline'}
              size={24}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
