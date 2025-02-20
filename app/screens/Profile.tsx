import React from 'react';
import { View, Text, Image, TouchableOpacity, StatusBar } from 'react-native';
import * as Linking from 'expo-linking';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useUser, useClerk } from '@clerk/clerk-expo';
import images from '@/app/constants/images';
import colors from '@/app/constants/colors';
import useStatusBar from '@/app/hooks/useStatusBar';

const Profile = () => {
  useStatusBar('dark-content', colors.stone);
  const { user } = useUser();

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
    <View className="flex-1 bottom-28 justify-center items-center bg-stone-50 p-5">
      <View className="w-full flex flex-row items-center bg-white border-2 border-gray-200 rounded-xl p-4 mb-4">
        <Image
          alt="profile"
          className="w-[68px] h-[68px] rounded-full"
          source={{ uri: user?.imageUrl || images.image.placeholder }}
        />
        <View className="ml-4 align-middle">
          <Text className="text-lg font-semibold">{user?.fullName}</Text>
          <Text className="text-base text-gray-500">
            {user?.primaryEmailAddress?.emailAddress}
          </Text>
        </View>
      </View>
      <TouchableOpacity className="w-full flex flex-row bg-white mb-2 items-center rounded-lg justify-between border-2 border-gray-200 py-2 px-3">
        <Text className="text-center text-gray-600">My Product</Text>
        <Ionicons name="briefcase-outline" size={24} color="gray" />
      </TouchableOpacity>
      <TouchableOpacity className="w-full flex flex-row bg-white mb-2 items-center rounded-lg justify-between border-2 border-gray-200 py-2 px-3">
        <Text className="text-center text-gray-600">Explore Now</Text>
        <Ionicons name="globe-outline" size={24} color="gray" />
      </TouchableOpacity>
      <TouchableOpacity className="w-full flex flex-row bg-white mb-2 items-center rounded-lg justify-between border-2 border-gray-200 py-2 px-3">
        <Text className="text-center text-gray-600">About Us</Text>
        <Ionicons name="information-circle-outline" size={24} color="gray" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleLogout}
        className="absolute bottom-10 w-full flex flex-row bg-white mb-4 items-center rounded-lg justify-between border-2 border-red-300 py-2 px-3">
        <Text className="text-center text-red-600">Sign Out</Text>
        <Ionicons name="log-out-outline" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );
};

export default Profile;
