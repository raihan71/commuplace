import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import {
  getDocs,
  query,
  collection,
  orderBy,
  getFirestore,
} from 'firebase/firestore';
import firebaseConfig from '@/firebaseConfig';
import ListItems from '@/app/components/HomeScreen/ListProduct';

const Explore = () => {
  const [latestItemList, setLatestItemList] = useState<any[]>([]);
  const db = getFirestore(firebaseConfig);

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
    getLatestItemList();
  }, []);

  return (
    <ScrollView className="bg-white flex-1">
      <ListItems data={latestItemList} title="Jelajahi Produk 🌐" />
    </ScrollView>
  );
};

export default Explore;
