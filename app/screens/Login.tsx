import React, { useCallback } from 'react';
import * as WebBrowser from 'expo-web-browser';
import { useSSO } from '@clerk/clerk-expo';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import useWarmUpBrowser from '../hooks/useWarmupBrowser';
import Home from './Home';

WebBrowser.maybeCompleteAuthSession();

const Login = () => {
  useWarmUpBrowser();

  const { startSSOFlow } = useSSO();

  const handleLogin = useCallback(async () => {
    try {
      const { createdSessionId, signIn, setActive } = await startSSOFlow({
        strategy: 'oauth_google',
      });
      if (createdSessionId) {
        setActive && setActive({ session: createdSessionId });
        return <Home />;
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
        className="w-full h-[400px] object-cover"
        source={require('../../assets/images/illustration/login-screen.png')}
      />
      <View>
        <Text className="text-2xl font-bold text-center">
          Community Marketplace
        </Text>
        <Text className="text-center mt-2">Meet people to buy or sell 🎉</Text>
        <View className="px-4">
          <TouchableOpacity
            onPress={handleLogin}
            className="bg-indigo-500 p-4 mt-4 rounded-lg">
            <Text className="text-white text-center">Sign in with Google</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Login;
