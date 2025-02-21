import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView, ScrollView, View, Image, Text } from 'react-native';
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
import images from '../constants/images';
import formatTime from '../utils/countDown';

const Home = () => {
  useStatusBar('dark-content', colors.white);

  const db = getFirestore(firebaseConfig);
  const [sliderList, setSliderList] = useState<any[]>([]);
  const [categoryList, setCategoryList] = useState<any[]>([]);
  const [latestItemList, setLatestItemList] = useState<any[]>([]);
  const [timeLeft, setTimeLeft] = useState(6600);

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
      query(collection(db, 'Product'), orderBy('createdAt', 'desc')),
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
        <Banner data={sliderList} />
        <Category data={categoryList} title="Kategori" />
        <Collection
          header={
            <View className="flex flex-row items-center">
              <Image source={images.image.flashsale} />
              <Text className="font-bold text-lg mx-1.5">🎉</Text>
              <Text className="font-bold text-lg">{formatTime(timeLeft)}</Text>
            </View>
          }
          data={latestItemList}
        />
        <ListItems data={latestItemList} heading="Paling Baru" />
      </SafeAreaView>
    </ScrollView>
  );
};

export default Home;
