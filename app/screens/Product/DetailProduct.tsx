import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useUser } from '@clerk/clerk-expo';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  Alert,
} from 'react-native';
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import useStatusBar from '@/app/hooks/useStatusBar';
import colors from '@/app/constants/colors';
import Collection from '@/app/components/HomeScreen/Collection';
import firebaseConfig from '@/firebaseConfig';
import currencyFormat from '@/app/utils/currencyFormat';
import Loading from '@/app/components/Loading';
import { updateCartItems } from '@/app/reducers/cartSlice';
import { useDispatch } from 'react-redux';

const DetailProduct = () => {
  const { params } = useRoute<any>();
  const [product, setProduct] = useState<any>([]);
  const [productList, setProductList] = useState<any>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const { user } = useUser();
  const db = getFirestore(firebaseConfig);
  const navigation = useNavigation<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    params && setProduct(params?.item);
  }, [params]);

  useStatusBar(
    modalVisible ? 'light-content' : 'dark-content',
    modalVisible ? colors.black : colors.white,
  );

  const handleClickImage = () => {
    setModalVisible(!modalVisible);
  };

  const getRecommendProducts = async () => {
    try {
      setLoading(true);
      setProductList([]);
      const q = query(
        collection(db, 'Product'),
        where('userEmail', '==', params?.item.userEmail),
      );
      const snapshot = await getDocs(q);
      snapshot.forEach((doc) => {
        if (doc.data().title !== params?.item.title) {
          setProductList((productList: any) => [...productList, doc.data()]);
        }
      });
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    params && getRecommendProducts();
  }, [params]);

  const handleAddCart = async () => {
    try {
      const existingCart = await AsyncStorage.getItem('my-cart');
      let cartItems = [];

      if (existingCart) {
        cartItems = JSON.parse(existingCart);
      }

      const productExists = cartItems.some(
        (item: any) => item.title === product.title,
      );

      if (!productExists) {
        const productWithQuantity = {
          ...product,
          quantity: 1,
        };
        cartItems.push(productWithQuantity);
        await AsyncStorage.setItem('my-cart', JSON.stringify(cartItems));
        dispatch(updateCartItems(cartItems));
        Alert.alert('Sukses', 'Produk berhasil ditambahkan ke keranjang');
        navigation.navigate('CartNav');
      } else {
        Alert.alert('Gagal', 'Produk sudah dikeranjang');
        navigation.navigate('CartNav');
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <ScrollView>
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
            <Text className="text-lg text-gray-500">
              {product?.description}
            </Text>
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
                <Text className="text-gray-500 ml-1.5">
                  {product?.userName}
                </Text>
                <View className="flex flex-row items-center ml-1">
                  <Ionicons name="star" color="orange" size={18} />
                  <Text className="text-xs text-gray-500 ml-1">4.3/5</Text>
                </View>
              </View>
            </View>
          </View>
          {!loading ?
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
      </ScrollView>
      <Modal
        visible={!!modalVisible}
        transparent={true}
        onRequestClose={handleClickImage}>
        <View className="flex-1 justify-center items-center h-full w-full bg-black bg-opacity-50">
          <TouchableOpacity
            className="absolute top-4 right-4"
            onPress={handleClickImage}>
            <Ionicons name="close" size={25} color="white" />
          </TouchableOpacity>
          <Image
            source={{ uri: product.image }}
            className="h-[420px] w-full"
            resizeMode="contain"
          />
        </View>
      </Modal>
    </>
  );
};

export default DetailProduct;
