import React, { useEffect, useState } from 'react';
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from 'firebase/firestore';
import { useRoute } from '@react-navigation/native';
import useStatusBar from '@/app/hooks/useStatusBar';
import colors from '@/app/constants/colors';
import ListItems from '@/app/components/ListItem';
import firebaseConfig from '@/firebaseConfig';
import NotFound from '@/app/components/NotFound';
import Loading from '@/app/components/Loading';
import { ScrollView } from 'react-native';

const CategoryListProduct = () => {
  useStatusBar('light-content', colors.primary);
  const { params } = useRoute<any>();
  const db = getFirestore(firebaseConfig);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    params && getProductCategory();
  }, [params]);

  const getProductCategory = async () => {
    setProducts([]);
    setLoading(true);
    const q = query(
      collection(db, 'Product'),
      where('category', '==', params?.category),
    );
    const snapshot = await getDocs(q);
    setLoading(false);
    snapshot.forEach((doc) => {
      setProducts((productList) => [...productList, doc.data()]);
      setLoading(false);
    });
  };

  return (
    <>
      {loading ?
        <Loading />
      : products.length > 0 ?
        <ScrollView>
          <ListItems
            data={products}
            heading={`Belanja ${params?.category} Yuk 🥳`}
          />
        </ScrollView>
      : <NotFound />}
    </>
  );
};

export default CategoryListProduct;
