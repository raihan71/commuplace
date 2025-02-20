import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import {
  collection,
  getDocs,
  getFirestore,
  orderBy,
  query,
} from 'firebase/firestore';
import Header from '@/app/components/Header';
import firebaseConfig from '@/firebaseConfig';
import Banner from '@/app/components/Slider';
import useStatusBar from '@/app/hooks/useStatusBar';
import colors from '@/app/constants/colors';
import Category from '@/app/components/Category';
import ListItems from '../components/ListItem';
import Collection from '../components/Collection';

const Home = () => {
  const ref = useRef(null);
  useStatusBar('dark-content', colors.white);

  const db = getFirestore(firebaseConfig);
  const [sliderList, setSliderList] = useState<any[]>([]);
  const [categoryList, setCategoryList] = useState<any[]>([]);
  const [latestItemList, setLatestItemList] = useState<any[]>([]);

  const getSliders = async () => {
    setSliderList([]);
    const querySnapshot = await getDocs(collection(db, 'Slider'));
    querySnapshot.forEach((doc) => {
      setSliderList((sliderList) => [...sliderList, doc.data()]);
    });
  };

  const getCategoryList = async () => {
    setCategoryList([]);
    const querySnapshot = await getDocs(collection(db, 'Category'));
    querySnapshot.forEach((doc) => {
      setCategoryList((categoryList) => [...categoryList, doc.data()]);
    });
  };

  const getLatestItemList = async () => {
    setLatestItemList([]);
    const querySnapShot = await getDocs(
      query(collection(db, 'Product'), orderBy('title', 'asc')),
    );
    querySnapShot.forEach((doc) => {
      setLatestItemList((latestItemList) => [...latestItemList, doc.data()]);
    });
  };

  useEffect(() => {
    getSliders();
    getCategoryList();
    getLatestItemList();
  }, []);

  return (
    <ScrollView className="bg-white flex-1">
      <SafeAreaView className="mb-2">
        <Header />
        <Banner data={sliderList} />
        <Category data={categoryList} title="Kategori" />
        <Collection data={latestItemList} />
        <ListItems data={latestItemList} heading="Paling Baru" />
      </SafeAreaView>
    </ScrollView>
  );
};

export default Home;
