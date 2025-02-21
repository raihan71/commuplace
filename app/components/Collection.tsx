import React from 'react';
import { View, FlatList, Text, Image, TouchableOpacity } from 'react-native';
import currencyFormat from '../utils/currencyFormat';
import PostItemMini from './PostItemMini';

const Collection = ({
  header,
  flashSale = true,
  data,
  background = '#fef9c3',
}: any) => {
  return (
    <View className="mt-3 pb-3.5" style={{ backgroundColor: `${background}` }}>
      <View className="flex flex-row items-center justify-between px-4 py-3">
        {header}
        <TouchableOpacity onPress={() => alert('See All')}>
          <Text className="text-xs">Semua</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        contentContainerStyle={{ paddingHorizontal: 18.5 }}
        data={data}
        horizontal={true}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            key={index}
            style={{
              marginRight: index === data.length - 1 ? 0 : 15,
            }}>
            <PostItemMini isFlashSale={flashSale} item={item} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Collection;
