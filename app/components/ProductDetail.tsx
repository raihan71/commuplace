import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Collection from './Collection';
import colors from '../constants/colors';
import Loading from './Loading';

const ProductDetail = ({
  product,
  productList,
  handleClickImage,
  handleAddCart,
  currencyFormat,
  user,
  loading,
}: any) => {
  return (
    <>
      <TouchableOpacity onPress={handleClickImage}>
        <Image source={{ uri: product.image }} className="h-[320px] w-full" />
      </TouchableOpacity>
      <View className="bg-white mb-2">
        <View className="p-3">
          <Text className="text-xl font-bold">
            Rp {currencyFormat(product?.price)}
          </Text>
          <Text className="text-lg text-ellipsis break-words">
            {product?.title}
          </Text>
          <View className="items-baseline">
            <Text className=" bg-indigo-200 p-1 mt-2 px-2 rounded-full text-indigo-500">
              {product.category}
            </Text>
          </View>
        </View>
      </View>

      <View className="bg-white mb-2">
        <View className="p-3">
          <Text className="font-bold text-lg">Deskripsi</Text>
          <Text className="text-lg text-gray-500">{product?.description}</Text>
        </View>
      </View>

      <View className="bg-white mb-3">
        <View className="p-3">
          <View className="flex flex-row items-center">
            <Image
              source={{ uri: product?.userImage }}
              className="h-10 w-10 rounded-full"
            />
            <View className="m-2">
              <Text className="text-gray-500 ml-1.5">{product?.userName}</Text>
              <View className="flex flex-row items-center ml-1">
                <Ionicons name="star" color="orange" size={18} />
                <Text className="text-xs text-gray-500 ml-1">4.3/5</Text>
              </View>
            </View>
          </View>
        </View>
        {!loading && productList.length > 0 ?
          productList.length > 0 ?
            <Collection
              background={colors.white}
              data={productList}
              flashSale={false}
              header={
                <View className="flex flex-row items-center">
                  <Text className="font-bold text-lg">
                    Lainnya dari penjual ini
                  </Text>
                </View>
              }
            />
          : ''
        : <Loading />}
      </View>

      {user?.primaryEmailAddress?.emailAddress !== product?.userEmail ?
        <View className="bg-white">
          <TouchableOpacity
            onPress={handleAddCart}
            className="fixed bg-indigo-500 rounded-lg p-4 mx-3 my-4 shadow-lg shadow-indigo-500/50">
            <Text className="text-center font-semibold text-white">
              Tambah ke Keranjang
            </Text>
          </TouchableOpacity>
        </View>
      : ''}
    </>
  );
};

export default ProductDetail;
