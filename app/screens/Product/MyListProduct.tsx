import React, { useEffect, useState } from 'react';
import {
  collection,
  deleteDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from 'firebase/firestore';
import ListItems from '@/app/components/ListItemManage';
import firebaseConfig from '@/firebaseConfig';
import NotFound from '@/app/components/NotFound';
import Loading from '@/app/components/Loading';
import { useUser } from '@clerk/clerk-expo';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ScrollEvent from '@/app/components/ScrollEvent';

const MyProduct = () => {
  const db = getFirestore(firebaseConfig);
  const navigation = useNavigation<any>();
  const { user } = useUser();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    user && getMyProduct();
  }, [user]);

  const getMyProduct = async () => {
    setLoading(true);
    try {
      const q = query(
        collection(db, 'Product'),
        where('userEmail', '==', user?.primaryEmailAddress?.emailAddress),
      );
      const snapshot = await getDocs(q);
      const productData = snapshot.docs.map((doc) => doc.data());
      setProducts(productData);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteData = (title: string) => {
    Alert.alert('Hapus Produk', 'Kamu yakin ingin menghapus produk ini?', [
      {
        text: 'Yes',
        onPress: () => deleteFromFirestore(title),
      },
      {
        text: 'Cancel',
        onPress: () => '',
        style: 'cancel',
      },
    ]);
  };

  const deleteFromFirestore = async (title: string) => {
    const q = query(collection(db, 'Product'), where('title', '==', title));
    const snapshot = await getDocs(q);
    snapshot.forEach((doc) => {
      deleteDoc(doc.ref).then(() => {
        setProducts((productList) =>
          productList.filter((product) => product.title !== title),
        );
        navigation.navigate('MyProduct');
      });
    });
  };

  return (
    <>
      {loading ?
        <Loading />
      : products.length > 0 ?
        <ScrollEvent>
          <ListItems
            handleOnTap={handleDeleteData}
            data={products}
            heading={`Manajemen Produk 📦`}
          />
        </ScrollEvent>
      : <NotFound />}
    </>
  );
};

export default MyProduct;
