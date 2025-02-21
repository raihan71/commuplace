import React, { useEffect, useState } from 'react';
import { View, FlatList, Image, Text } from 'react-native';
import ProductMini from '../ProductMini';
import timerCountDown from '@/app/utils/countDownTimer';

const Collection = ({ title, data }: any) => {
  const [timeLeft, setTimeLeft] = useState(3600);
  useEffect(() => {
    if (timeLeft === 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  return (
    <View className="mt-3.5 pb-3.5 bg-yellow-100 rounded-lg">
      <View className="flex flex-row items-center justify-between px-4 py-3">
        <View className="flex flex-row items-center">
          <Image
            source={require('../../../assets/images/Flashsale-Blue-Mobile.png')}
          />
          <Text className="font-bold text-lg ml-2"></Text>
          <Text className="font-bold text-lg">{timerCountDown(timeLeft)}</Text>
        </View>
        <Text className="text-xs">Semua</Text>
      </View>
      <FlatList
        contentContainerStyle={{ paddingHorizontal: 18.5 }}
        data={data}
        horizontal={true}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View
            key={index}
            style={{
              marginRight: index === data.length - 1 ? 0 : 15,
            }}>
            <ProductMini item={item} />
          </View>
        )}
      />
    </View>
  );
};

export default Collection;
