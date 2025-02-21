import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Home, CategoryListProduct, DetailProduct } from '@/app/screens';
import colors from '@/app/constants/colors';

const Stack = createStackNavigator();

const HomeScreenStackNav = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
          backgroundColor: colors.white,
        },
        headerTitleStyle: {
          fontSize: 16,
          fontWeight: '600',
        },
      }}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CategoryProduct"
        component={CategoryListProduct}
        options={({ route }: any) => ({
          animation: 'slide_from_right',
          title: route.params.category,
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        })}
      />
      <Stack.Screen
        name="ProductDetail"
        component={DetailProduct}
        options={() => ({
          animation: 'slide_from_right',
          title: '',
          headerTintColor: colors.gray,
          headerStyle: {
            elevation: 5,
            shadowColor: colors.black,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            backgroundColor: colors.white,
          },
        })}
      />
    </Stack.Navigator>
  );
};

export default HomeScreenStackNav;
