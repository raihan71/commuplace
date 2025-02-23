import React, { useEffect, useState } from 'react';
import {
  collection,
  getDocs,
  getFirestore,
  orderBy,
  query,
} from 'firebase/firestore';
import { SafeAreaView, ScrollView, Text, View, Image } from 'react-native';
import firebaseConfig from '@/firebaseConfig';
import Header from '../components/HomeScreen/Header';
import Banner from '../components/HomeScreen/Banner';
import Category from '../components/HomeScreen/Category';
import ListProduct from '../components/HomeScreen/ListProduct';
import FlashSale from '../components/HomeScreen/Collection';
import colors from '../constants/colors';
import images from '../constants/images';
import timerCountDown from '../utils/countDownTimer';

const Home = () => {
  const db = getFirestore(firebaseConfig);
  const [banners, setBanners] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [newProducts, setNewProducts] = useState<any[]>([]);
  const [timeLeft, setTimeLeft] = useState(6600);

  const getBannerList = async () => {
    setBanners([]);
    const querySnapshot = await getDocs(collection(db, 'Slider'));
    querySnapshot.forEach((doc) => {
      setBanners((bannerList) => [...bannerList, doc.data()]);
    });
  };

  const getCategoryList = async () => {
    setCategories([]);
    const querySnapshot = await getDocs(collection(db, 'Category'));
    querySnapshot.forEach((doc) => {
      setCategories((categoryList) => [...categoryList, doc.data()]);
    });
  };

  const getNewProductList = async () => {
    setNewProducts([]);
    const querySnapShot = await getDocs(
      query(collection(db, 'Product'), orderBy('createdAt', 'desc')),
    );
    querySnapShot.forEach((doc) => {
      setNewProducts((productList) => [...productList, doc.data()]);
    });
  };

  useEffect(() => {
    getBannerList();
    getCategoryList();
    getNewProductList();
  }, []);

  useEffect(() => {
    if (timeLeft === 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  return (
    <ScrollView className="bg-white flex-1">
      <SafeAreaView className="mb-2">
        <Header />
        <Banner data={banners} />
        <Category data={categories} title="Kategori" />
        <FlashSale
          background={colors.stone}
          data={newProducts}
          flashSale={true}
          header={
            <View className="flex flex-row items-center">
              <Image source={images.image.flashsale} />
              <Text className="font-bold text-lg mx-1.5">🎉</Text>
              <Text className="font-bold text-lg">
                {timerCountDown(timeLeft)}
              </Text>
            </View>
          }
        />
        <ListProduct data={newProducts} title="Paling Baru" />
      </SafeAreaView>
    </ScrollView>
  );
};

export default Home;
