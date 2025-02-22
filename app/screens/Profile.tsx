import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import * as Linking from 'expo-linking';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useUser, useClerk } from '@clerk/clerk-expo';
import images from '@/app/constants/images';
import colors from '@/app/constants/colors';
import useStatusBar from '@/app/hooks/useStatusBar';
import { useNavigation } from '@react-navigation/native';

const Profile = () => {
  useStatusBar('dark-content', colors.white);
  const navigation = useNavigation<any>();
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

  const handleTapMenu = (route: string) => {
    navigation.navigate(route);
  };

  return (
    <View className="flex-1 bottom-28 justify-center items-center bg-white p-5">
      <View className="w-full flex flex-row items-center border border-slate-200 rounded-xl p-4 mb-4">
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
      <TouchableOpacity
        onPress={() => handleTapMenu('MyProduct')}
        className="w-full flex flex-row mb-2 items-center rounded-lg justify-between border border-slate-200 py-2 px-3">
        <Text className="text-center text-gray-600">Produk Saya</Text>
        <Ionicons name="briefcase-outline" size={24} color="gray" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleTapMenu('ExploreNav')}
        className="w-full flex flex-row mb-2 items-center rounded-lg justify-between border border-slate-200 py-2 px-3">
        <Text className="text-center text-gray-600">Jelajahi Commuplace</Text>
        <Ionicons name="globe-outline" size={24} color="gray" />
      </TouchableOpacity>
      <TouchableOpacity className="w-full flex flex-row mb-2 items-center rounded-lg justify-between border border-slate-200 py-2 px-3">
        <Text className="text-center text-gray-600">Tentang Kami</Text>
        <Ionicons name="information-circle-outline" size={24} color="gray" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleLogout}
        className="absolute bottom-10 w-full flex flex-row mb-4 items-center rounded-lg justify-between border border-red-300 py-2 px-3">
        <Text className="text-center text-red-600">Keluar</Text>
        <Ionicons name="log-out-outline" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );
};

export default Profile;
