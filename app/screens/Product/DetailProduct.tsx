import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useUser } from '@clerk/clerk-expo';
import { View, TouchableOpacity, Image, Modal } from 'react-native';
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import useStatusBar from '@/app/hooks/useStatusBar';
import colors from '@/app/constants/colors';
import Collection from '@/app/components/Collection';
import firebaseConfig from '@/firebaseConfig';
import currencyFormat from '@/app/utils/currencyFormat';
import { updateCartItems } from '@/app/reducers/cartSlice';
import ScrollEvent from '@/app/components/ScrollEvent';
import ProductDetail from '@/app/components/ProductDetail';

const DetailProduct = () => {
  const { params } = useRoute<any>();
  const [product, setProduct] = useState<any>([]);
  const [productList, setProductList] = useState<any>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const { user } = useUser();
  const db = getFirestore(firebaseConfig);
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();
  const [loading, setLoading] = useState(false);

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
          createdAt:
            product.createdAt ?
              new Date(product.createdAt.seconds * 1000).toISOString()
            : null,
          quantity: 1,
        };
        cartItems.push(productWithQuantity);
        await AsyncStorage.setItem('my-cart', JSON.stringify(cartItems));
        dispatch(updateCartItems(cartItems));
        alert('Produk berhasil ditambahkan ke keranjang');
        navigation.navigate('PaymentNav');
      } else {
        alert('Produk sudah dikeranjang');
      }
    } catch (e) {
      throw e;
    }
  };

  return (
    <>
      <ScrollEvent>
        <ProductDetail
          product={product}
          productList={productList}
          handleAddCart={handleAddCart}
          handleClickImage={handleClickImage}
          currencyFormat={currencyFormat}
          user={user}
          loading={loading}
        />
      </ScrollEvent>
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
