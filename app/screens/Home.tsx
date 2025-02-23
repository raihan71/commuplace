import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Image, Text } from 'react-native';
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
import ScrollEvent from '../components/ScrollEvent';
import Loading from '../components/Loading';

const Home = () => {
  useStatusBar('dark-content', colors.white);

  const db = getFirestore(firebaseConfig);
  const [sliderList, setSliderList] = useState<any[]>([]);
  const [categoryList, setCategoryList] = useState<any[]>([]);
  const [latestItemList, setLatestItemList] = useState<any[]>([]);
  const [timeLeft, setTimeLeft] = useState(6600);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [sliderDocs, categoryDocs, productDocs] = await Promise.all([
        getDocs(collection(db, 'Slider')),
        getDocs(collection(db, 'Category')),
        getDocs(query(collection(db, 'Product'), orderBy('cratedAt', 'desc'))),
      ]);

      setSliderList(sliderDocs.docs.map((doc) => doc.data()));
      setCategoryList(categoryDocs.docs.map((doc) => doc.data()));
      setLatestItemList(productDocs.docs.map((doc) => doc.data()));
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (timeLeft === 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  return (
    <>
      {!loading ?
        <ScrollEvent>
          <SafeAreaView className="mb-2">
            <Header />
            <Banner data={sliderList} />
            <Category data={categoryList} title="Kategori" />
            <Collection
              header={
                <View className="flex flex-row items-center">
                  <Image source={images.image.flashsale} />
                  <Text className="font-bold text-lg mx-1.5">🎉</Text>
                  <Text className="font-bold text-lg">
                    {formatTime(timeLeft)}
                  </Text>
                </View>
              }
              data={latestItemList}
            />
            <ListItems data={latestItemList} heading="Paling Baru" />
          </SafeAreaView>
        </ScrollEvent>
      : <Loading />}
    </>
  );
};

export default Home;
