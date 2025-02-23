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
import ListItems from '../components/ListItem';
import ScrollEvent from '../components/ScrollEvent';

const Explore = () => {
  const [latestItemList, setLatestItemList] = useState<any[]>([]);
  const db = getFirestore(firebaseConfig);

  const getLatestItemList = async () => {
    setLatestItemList([]);
    const querySnapShot = await getDocs(
      query(collection(db, 'Product'), orderBy('cratedAt', 'desc')),
    );
    querySnapShot.forEach((doc) => {
      setLatestItemList((latestItemList) => [...latestItemList, doc.data()]);
    });
  };

  useEffect(() => {
    getLatestItemList();
  }, []);

  return (
    <ScrollEvent>
      <ListItems data={latestItemList} heading="Jelajahi Produk 🌐" />
    </ScrollEvent>
  );
};

export default Explore;
