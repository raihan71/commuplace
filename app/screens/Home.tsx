import React from 'react';
import { useClerk } from '@clerk/clerk-expo';
import * as Linking from 'expo-linking';
import { Button, Text, View } from 'react-native';

const Home = () => {
  const { signOut } = useClerk();

  const handleLogout = async () => {
    try {
      await signOut();
      Linking.openURL(Linking.createURL('/'));
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };
  return (
    <View>
      <Text className="text-red-400 text-center">Welcome to martketplace</Text>
      <Button title="Log Out" onPress={handleLogout} />
    </View>
  );
};

export default Home;
