import React, { useCallback } from 'react';
import * as WebBrowser from 'expo-web-browser';
import { useSSO } from '@clerk/clerk-expo';
import * as Linking from 'expo-linking';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import useWarmUpBrowser from '../hooks/useWarmupBrowser';
import images from '../constants/images';

WebBrowser.maybeCompleteAuthSession();

const Login = ({ strategy }: any) => {
  useWarmUpBrowser();
  const { startSSOFlow } = useSSO();
  const handleLogin = useCallback(async () => {
    try {
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy,
        redirectUrl: Linking.createURL('/', {
          scheme: 'martketplacecommunity',
        }),
      });

      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
      }
    } catch (err) {
      console.error('OAuth error', err);
    }
  }, []);

  return (
    <View>
      <Image
        className="w-full h-[400px] object-cover"
        source={images.illustrations.login}
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
