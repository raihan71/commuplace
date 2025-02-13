import React, { useCallback } from 'react';
import * as WebBrowser from 'expo-web-browser';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useSSO } from '@clerk/clerk-expo';
import useWarmUpBrowser from '../hooks/warmUpBrowser';

WebBrowser.maybeCompleteAuthSession();

export default function Login() {
  useWarmUpBrowser();
  const { startSSOFlow } = useSSO();

  const handleLogin = useCallback(async () => {
    try {
      const { createdSessionId, signIn, setActive } = await startSSOFlow({
        strategy: 'oauth_google',
      });

      if (createdSessionId) {
        setActive && setActive({ session: createdSessionId });
      } else {
        signIn;
      }
    } catch (error) {
      console.error(JSON.stringify(error, null, 2));
    }
  }, []);

  return (
    <View>
      <Image
        className="w-full h-[400px] object-contain"
        source={require('../../assets/images/login-screen.png')}
      />
      <View>
        <Text className="text-2xl font-bold text-center">
          Community Marketplace
        </Text>
        <Text className="text-center mt-2">Meet people to buy or sell 🎉</Text>
        <View className="px-4">
          <TouchableOpacity
            onPress={handleLogin}
            className="bg-indigo-500 p-4 rounded-lg mt-4">
            <Text className="text-center text-white">Get Started</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
