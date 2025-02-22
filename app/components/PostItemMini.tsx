import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import currencyFormat from '../utils/currencyFormat';

const PostItemMini = ({ item, isFlashSale = true }: any) => {
  const navigation = useNavigation<any>();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('ProductDetail', { item })}>
      <View>
        <Image
          source={{ uri: item?.image }}
          className="rounded-lg"
          style={{ width: 100, height: 100 }}
          resizeMode="contain"
        />
      </View>
      <View>
        {!isFlashSale ?
          <Text
            ellipsizeMode="tail"
            numberOfLines={1}
            style={{ width: 100 }}
            className="text-xs mt-1 text-ellipsis break-words">
            {item?.title}
          </Text>
        : ''}
        <Text className="mt-1">
          <Text className="text-xs">Rp</Text>{' '}
          <Text className="text-sm font-bold">
            {currencyFormat(item?.price)}
          </Text>
        </Text>
        {isFlashSale ?
          <>
            <View className="bg-red-200 rounded-full h-1.5">
              <View
                className="bg-red-500 h-1.5 rounded-full"
                style={{ width: `70%` }}
              />
            </View>
            <Text className="text-xs text-gray-500 mt-1">Sisa 1 hari lagi</Text>
          </>
        : ''}
      </View>
    </TouchableOpacity>
  );
};

export default PostItemMini;
