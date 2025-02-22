import React from 'react';
import { View, Text, FlatList } from 'react-native';
import PostItemManage from './PostItemManage';

const ListItems = ({ data, handleOnTap, heading }: any) => {
  return (
    <View className="mt-3 px-2.5">
      <Text className="font-bold text-lg ml-2">{heading}</Text>
      <FlatList
        scrollEnabled={false}
        data={data}
        numColumns={2}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <PostItemManage
            handlePress={() => handleOnTap(item?.title)}
            item={item}
          />
        )}
      />
    </View>
  );
};

export default ListItems;
