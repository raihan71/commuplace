import React from 'react';
import { View } from 'react-native';
import { Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import currencyFormat from '@/app/utils/currencyFormat';

const FormCart = ({
  cartItems,
  total,
  updateQuantity,
  removeItem,
  handleCheckout,
}: any) => {
  return (
    <>
      <View className="px-6 py-4 bg-white shadow-sm">
        <Text className="text-2xl font-semibold text-gray-900">
          Keranjang Belanja
        </Text>
        <Text className="text-sm text-gray-500">{cartItems.length} item</Text>
      </View>

      <View className="flex flex-1 px-6 py-4">
        {cartItems.map((item: any, index: number) => (
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
    </>
  );
};

export default FormCart;
