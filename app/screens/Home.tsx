import React, { useEffect, useState } from 'react';
import {
  collection,
  getDocs,
  getFirestore,
  orderBy,
  query,
} from 'firebase/firestore';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import firebaseConfig from '@/firebaseConfig';
import Header from '../components/HomeScreen/Header';
import Banner from '../components/HomeScreen/Banner';
import Category from '../components/HomeScreen/Category';
import ListProduct from '../components/HomeScreen/ListProduct';
import FlashSale from '../components/HomeScreen/Collection';

const Home = () => {
  const db = getFirestore(firebaseConfig);
  const [banners, setBanners] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [newProducts, setNewProducts] = useState<any[]>([]);

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

  return (
    <ScrollView className="bg-white flex-1">
      <SafeAreaView className="mb-2">
        <Header />
        <Banner data={banners} />
        <Category data={categories} title="Kategori" />
        <FlashSale data={newProducts} title="Flash Sale" />
        <ListProduct data={newProducts} title="Paling Baru" />
      </SafeAreaView>
    </ScrollView>
  );
};

export default Home;
