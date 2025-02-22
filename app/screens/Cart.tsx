import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useStatusBar from '../hooks/useStatusBar';
import colors from '../constants/colors';
import currencyFormat from '../utils/currencyFormat';
import NotFound from '../components/NotFound';
import { updateCartItems } from '../reducers/cartSlice';

const AddCart = () => {
  const navigation = useNavigation<any>();
  useStatusBar('dark-content', colors.white);
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
  const dispatch = useDispatch();

  const updateQuantity = async (index: number, change: number) => {
    const newItems = cartItems.map((item, i) =>
      i === index ?
        { ...item, quantity: Math.max(1, item.quantity + change) }
      : item,
    );
    setCartItems(newItems);
    try {
      await AsyncStorage.setItem('my-cart', JSON.stringify(newItems));
      dispatch(updateCartItems(newItems));
    } catch (e) {
      alert(`Error updating storage: ${e}`);
    }
  };

  const removeItem = async (index: number) => {
    const newItems = cartItems.filter((_, i) => i !== index);
    setCartItems(newItems);
    try {
      await AsyncStorage.setItem('my-cart', JSON.stringify(newItems));
      dispatch(updateCartItems(newItems));
    } catch (e) {
      alert(`Error removing item from storage: ${e}`);
    }
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item?.price * item?.quantity,
    0,
  );

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

  const handleCheckout = () => {
    navigation.navigate('Checkout');
  };

  const renderCart = (
    <ScrollView className="flex flex-col h-screen bg-gray-50">
      <View className="px-6 py-4 bg-white shadow-sm">
        <Text className="text-2xl font-semibold text-gray-900">
          Keranjang Belanja
        </Text>
        <Text className="text-sm text-gray-500">{cartItems.length} item</Text>
      </View>

      <View className="flex flex-1 px-6 py-4">
        {cartItems.map((item, index) => (
          <View
            key={index}
            className="flex flex-row items-center py-4 space-x-10 border-b border-gray-200">
            <Image
              source={{ uri: item?.image }}
              alt={item?.title}
              className="w-20 h-20 rounded-lg object-cover bg-gray-100"
            />

            <View>
              <Text className="text-xs font-medium text-gray-900 truncate">
                {item?.title}
              </Text>
              <Text className="text-sm text-gray-500">
                Rp {currencyFormat(item?.price)}
              </Text>
            </View>

            <View className="flex flex-col items-center px-4 space-x-1 space-y-1">
              <TouchableOpacity
                aria-label="Decrease quantity"
                onPress={() => updateQuantity(index, -1)}
                className="p-1 rounded-full hover:bg-gray-100">
                <Ionicons name="remove-outline" size={24} color="black" />
              </TouchableOpacity>

              <Text className="w-8 text-center text-gray-900">
                {item.quantity}
              </Text>

              <TouchableOpacity
                aria-label="Increase quantity"
                onPress={() => updateQuantity(index, 1)}
                className="p-1 rounded-full hover:bg-gray-100">
                <Ionicons name="add" size={24} color="black" />
              </TouchableOpacity>

              <TouchableOpacity
                aria-label="Delete item"
                onPress={() => removeItem(index)}
                className="p-1 rounded-full hover:bg-gray-100 ml-2">
                <Ionicons name="trash-outline" size={24} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>

      <View className="px-6 py-4 bg-white shadow-lg">
        <View className="flex justify-between mb-4">
          <Text className="text-gray-600">Subtotal</Text>
          <Text className="text-gray-900 font-medium">
            Rp {currencyFormat(total.toFixed(0))}
          </Text>
        </View>
        <TouchableOpacity
          onPress={handleCheckout}
          className="w-full py-3 fixed bg-indigo-500 text-white rounded-lg">
          <Text className="text-white text-center font-semibold">Checkout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  return (
    <>
      {cartItems.length > 0 ?
        renderCart
      : <NotFound
          title="Keranjang Belanja Kosong"
          message="Yuk Mulai Belanja 🙏"
        />
      }
    </>
  );
};

export default AddCart;
