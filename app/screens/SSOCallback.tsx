import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useAuth } from '@clerk/clerk-expo';
import { NavigationProp } from '@react-navigation/native';
import { useNavigation } from 'expo-router';

const SSOCallback = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const navigation = useNavigation<NavigationProp<any>>();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      // Navigate to your main app screen
      navigation.navigate('Home');
    } else if (isLoaded && !isSignedIn) {
      navigation.navigate('Login');
    }
  }, [isLoaded, isSignedIn]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default SSOCallback;
