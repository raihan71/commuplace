import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../../screens/Home';
import Login from '../../screens/Login';
import SSOCallback from '../../screens/SSOCallback';
import * as Linking from 'expo-linking';

const StackScreen = () => {
  const StackNavigator = createNativeStackNavigator();

  const linking = {
    prefixes: [Linking.createURL('/')],
    config: {
      screens: {
        Login: 'login',
        SSOCallback: 'sso-callback',
      },
    },
  };

  return (
    <NavigationContainer linking={linking}>
      <StackNavigator.Navigator>
        <StackNavigator.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <StackNavigator.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <StackNavigator.Screen
          name="SSOCallback"
          component={SSOCallback}
          options={{ headerShown: false }}
        />
      </StackNavigator.Navigator>
    </NavigationContainer>
  );
};

export default StackScreen;
