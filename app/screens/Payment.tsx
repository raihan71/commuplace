import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import currencyFormat from '../utils/currencyFormat';
import { updateCartItems } from '../reducers/cartSlice';
import { useDispatch } from 'react-redux';

const Payment = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();

  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: 'Minimal Desk Lamp',
      price: 89.99,
      quantity: 1,
      image: '/api/placeholder/100/100',
    },
    {
      id: 2,
      title: 'Modern Coffee Table',
      price: 299.99,
      quantity: 2,
      image: '/api/placeholder/100/100',
    },
  ]);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('my-cart');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      throw e;
    }
  };

  useEffect(() => {
    getData().then((data) => {
      if (data) {
        setCartItems(data);
      }
    });
  }, [getData]);

  const handleCheckout = async () => {
    setCartItems([]);
    try {
      await AsyncStorage.setItem('my-cart', JSON.stringify([]));
      dispatch(updateCartItems([]));
      alert('Checkout sukses!');
    } catch (e) {
      alert(`Error removing item from storage: ${e}`);
    }
    navigation.goBack();
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item?.price * item?.quantity,
    0,
  );

  return (
    <ScrollView className="flex-1">
      <View className="p-3.5">
        <View className="flex flex-col mb-6 bg-white p-4 rounded-lg">
          <Text className="font-semibold text-gray-800 mb-4">
            Rincian Pesanan
          </Text>
          {cartItems?.map((item, index) => (
            <View key={index} className="flex-row items-center space-x-4 mb-4">
              <Image
                className="w-20 h-20 bg-gray-200 rounded-lg"
                source={{ uri: item.image }}
              />
              <View>
                <Text className="font-semibold text-gray-800">
                  {item.title}
                </Text>
                <Text className="text-gray-600">Quantity: {item.quantity}</Text>
                <Text className="text-indigo-600 font-semibold">
                  Rp {currencyFormat(item.price)}
                </Text>
              </View>
            </View>
          ))}
        </View>
        <View className="flex flex-col mb-6 bg-white p-4 rounded-lg">
          <Text className="font-semibold text-gray-800 mb-4">
            Alamat Pengiriman
          </Text>
          <Text className="text-xs text-gray-500 text-ellipsis">
            Jl. Mahaka Gg.Pulo 2, Bandung
          </Text>
        </View>
        <View className="flex flex-col mb-6 bg-white p-4 rounded-lg">
          <Text className="font-semibold text-gray-800 mb-4">Metode Bayar</Text>
          <View className="flex-row items-center space-x-4 mb-4">
            <TouchableOpacity className="flex-row items-center space-x-4">
              <View className="w-10 h-10 bg-gray-200 rounded-lg" />
              <Text className="font-semibold text-gray-800">Transfer Bank</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center space-x-4">
              <View className="w-10 h-10 bg-gray-200 rounded-lg" />
              <Text className="font-semibold text-gray-800">OVO</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className="flex flex-col mb-6 bg-white p-4 rounded-lg">
          <View className="flex-row justify-between">
            <Text className="text-gray-600">Total</Text>
            <Text className="font-bold text-gray-800">
              Rp {currencyFormat(total.toFixed(0))}
            </Text>
          </View>
        </View>
        <View className="mb-2 bg-white rounded-lg">
          <TouchableOpacity
            onPress={handleCheckout}
            className="bg-indigo-500 rounded-lg p-4"
            activeOpacity={0.8}>
            <Text className="text-white text-center font-semibold">
              Bayar Sekarang
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Payment;
