import React, { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Minimal Desk Lamp',
      price: 89.99,
      quantity: 1,
      image: '/api/placeholder/100/100',
    },
    {
      id: 2,
      name: 'Modern Coffee Table',
      price: 299.99,
      quantity: 2,
      image: '/api/placeholder/100/100',
    },
  ]);

  const updateQuantity = (id: any, change: any) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ?
          { ...item, quantity: Math.max(1, item.quantity + change) }
        : item,
      ),
    );
  };

  const removeItem = (id: any) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <ScrollView className="flex flex-col h-screen bg-gray-50">
      <View className="px-6 py-4 bg-white shadow-sm">
        <Text className="text-2xl font-semibold text-gray-900">
          Keranjang Belanja
        </Text>
        <Text className="text-sm text-gray-500">{cartItems.length} item</Text>
      </View>

      <View className="flex flex-1 px-6 py-4">
        {cartItems.map((item) => (
          <View
            key={item.id}
            className="flex flex-row items-center py-4 space-x-4 border-b border-gray-200">
            <Image
              source={{ uri: item.image }}
              alt={item.name}
              className="w-20 h-20 rounded-lg object-cover bg-gray-100"
            />

            <View>
              <Text className="text-xs font-medium text-gray-900 truncate">
                {item.name}
              </Text>
              <Text className="text-sm text-gray-500">${item.price}</Text>
            </View>

            <View className="flex flex-col items-center px-10 space-x-1 space-y-1">
              <TouchableOpacity
                aria-label="Decrease quantity"
                onPress={() => updateQuantity(item.id, -1)}
                className="p-1 rounded-full hover:bg-gray-100">
                <Ionicons name="remove-outline" size={24} color="black" />
              </TouchableOpacity>

              <Text className="w-8 text-center text-gray-900">
                {item.quantity}
              </Text>

              <TouchableOpacity
                aria-label="Increase quantity"
                onPress={() => updateQuantity(item.id, 1)}
                className="p-1 rounded-full hover:bg-gray-100">
                <Ionicons name="add" size={24} color="black" />
              </TouchableOpacity>

              <TouchableOpacity
                aria-label="Delete item"
                onPress={() => removeItem(item.id)}
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
          <Text className="text-gray-900 font-medium">${total.toFixed(2)}</Text>
        </View>
        <TouchableOpacity className="w-full py-3 bg-indigo-500 text-white rounded-lg">
          <Text className="text-white text-center font-semibold">Bayar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Cart;
