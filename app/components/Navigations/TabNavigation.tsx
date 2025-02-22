import React from 'react';
import { Text } from 'react-native';
import { useSelector } from 'react-redux';
import { useSegments } from 'expo-router';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import { AddProduct } from '@/app/screens';
import colors from '@/app/constants/colors';
import HomeScreenStackNav from './StackNavigation/HomeStack';
import ExploreStackNav from './StackNavigation/ExploreStack';
import ProfileStackNav from './StackNavigation/ProfileStack';
import PaymentStackNav from './StackNavigation/PaymentStack';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  const segments: string[] = useSegments();
  const screensWithHiddenTabs = [
    'ProductDetail',
    'CategoryProduct',
    'Checkout',
  ];
  const badgeCount = useSelector((state: any) => state.cart.badgeCount);

  const hide = screensWithHiddenTabs.some((screen) =>
    segments.includes(screen),
  );

  return (
    <Tab.Navigator
      initialRouteName="HomeNav"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 53,
          display: hide ? 'none' : 'flex',
        },
      }}>
      <Tab.Screen
        name="HomeNav"
        component={HomeScreenStackNav}
        options={{
          tabBarActiveTintColor: colors.primary,
          tabBarLabel: ({ color }) => (
            <Text
              style={{
                color: color,
                fontSize: 12,
                marginLeft: 2,
              }}>
              Beranda
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
        name="ExploreNav"
        component={ExploreStackNav}
        options={{
          tabBarActiveTintColor: colors.primary,
          tabBarLabel: ({ color }) => (
            <Text
              style={{
                color: color,
                fontSize: 12,
                marginLeft: 2,
              }}>
              Jelajahi
            </Text>
          ),
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'globe' : 'globe-outline'}
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="PaymentNav"
        component={PaymentStackNav}
        options={{
          tabBarBadge: badgeCount > 0 ? badgeCount : null,
          tabBarActiveTintColor: colors.primary,
          tabBarLabel: ({ color }) => (
            <Text
              style={{
                color: color,
                fontSize: 12,
                marginLeft: 5,
              }}>
              Keranjang
            </Text>
          ),
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              style={{ marginLeft: 2 }}
              name={focused ? 'cart' : 'cart-outline'}
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
                marginLeft: 8,
              }}>
              Upload
            </Text>
          ),
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              style={{ marginLeft: 5 }}
              name={focused ? 'camera' : 'camera-outline'}
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileNav"
        component={ProfileStackNav}
        options={{
          tabBarActiveTintColor: colors.primary,
          tabBarLabel: ({ color }) => (
            <Text
              style={{
                color: color,
                fontSize: 12,
                marginLeft: 2,
              }}>
              Akun
            </Text>
          ),
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'person' : 'person-outline'}
              size={24}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
