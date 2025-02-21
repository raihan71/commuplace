import React from 'react';
import { View, Image, Text } from 'react-native';
import currencyFormat from '../utils/currencyFormat';

const ProductMini = ({ item }: any) => {
  return (
    <>
      <View>
        <Image
          source={{ uri: item?.image }}
          className="rounded-lg"
          style={{ width: 100, height: 100 }}
          resizeMode="contain"
        />
      </View>
      <View>
        <Text className="mt-1">
          <Text className="text-xs">Rp</Text>{' '}
          <Text className="text-sm font-bold">
            {currencyFormat(item?.price)}
          </Text>
        </Text>
        <View className="bg-red-200 rounded-full h-1.5">
          <View
            className="bg-red-500 h-1.5 rounded-full"
            style={{ width: `70%` }}
          />
        </View>
        <Text className="text-xs">Cepat habis</Text>
      </View>
    </>
  );
};

export default ProductMini;
