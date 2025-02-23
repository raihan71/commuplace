import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useSegments } from 'expo-router';
import colors from '@/app/constants/colors';
import AddProduct from '@/app/screens/Product/AddProduct';
import HomeScreenStackNav from './StackNavigation/HomeStack';
import ExploreStackNav from './StackNavigation/ExploreStack';
import PaymentStackNav from './StackNavigation/PaymentStack';
import ProfileStackNav from './StackNavigation/ProfileStack';

const Tab = createBottomTabNavigator();

const tabConfig = [
  {
    name: 'HomeNav',
    component: HomeScreenStackNav,
    label: 'Beranda',
    icon: 'home',
  },
  {
    name: 'ExploreNav',
    component: ExploreStackNav,
    label: 'Jelajah',
    icon: 'globe',
  },
  {
    name: 'CartNav',
    component: PaymentStackNav,
    label: 'Keranjang',
    icon: 'cart',
    showBadge: true,
  },
  {
    name: 'AddProduct',
    component: AddProduct,
    label: 'Upload',
    icon: 'camera',
  },
  {
    name: 'ProfileNav',
    component: ProfileStackNav,
    label: 'Akun Saya',
    icon: 'person',
  },
];

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

  const getTabOptions = (item: (typeof tabConfig)[0]) => ({
    tabBarActiveTintColor: colors.primary,
    tabBarBadge: item.showBadge && badgeCount > 0 ? badgeCount : null,
    tabBarLabel: ({ color }: { color: string }) => (
      <Text
        style={{
          color: color,
          fontSize: 12,
          marginLeft: 2,
        }}>
        {item.label}
      </Text>
    ),
    tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) => {
      const iconName = focused ? item.icon : `${item.icon}-outline`;
      return (
        <Ionicons
          style={{ marginLeft: 2 }}
          name={iconName as keyof typeof Ionicons.glyphMap}
          size={24}
          color={color}
        />
      );
    },
  });

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
      {tabConfig.map((item) => (
        <Tab.Screen
          key={item.name}
          name={item.name}
          component={item.component}
          options={getTabOptions(item)}
        />
      ))}
    </Tab.Navigator>
  );
};

export default TabNavigation;
