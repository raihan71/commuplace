import React, { useEffect, useState } from 'react';
import { ScrollView, KeyboardAvoidingView, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import colors from '@/app/constants/colors';
import { getFirestore, getDocs, collection, addDoc } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import firebaseConfig from '@/firebaseConfig';
import { useUser } from '@clerk/clerk-expo';
import useStatusBar from '@/app/hooks/useStatusBar';
import FormProduct from '@/app/components/Forms/FormProduct';
import ScrollEvent from '@/app/components/ScrollEvent';

const AddProduct = () => {
  useStatusBar('dark-content', colors.white);
  const [image, setImage] = useState<any>();
  const db = getFirestore(firebaseConfig);
  const storage = getStorage();
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const [categoryList, setCategoryList] = useState<any[]>([]);

  useEffect(() => {
    getCategoryList();
  }, []);

  const initialValues = {
    title: '',
    description: '',
    price: '',
    category: '',
    image: '',
    userName: '',
    userEmail: '',
    userImage: '',
    createdAt: Date.now(),
  };

  const getCategoryList = async () => {
    setLoading(true);
    setCategoryList([]);
    const querySnapshot = await getDocs(collection(db, 'Category'));
    querySnapshot.forEach((doc) => {
      setCategoryList((categoryList) => [...categoryList, doc.data()]);
      setLoading(false);
    });
  };

  const handleChangeImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
        allowsMultipleSelection: false,
      });
      return result.canceled ? null : setImage(result.assets[0].uri);
    } catch (error) {
      throw error;
    }
  };

  const handleSaveProduct = async (values: any, resetForm: any) => {
    try {
      setLoading(true);
      const resp = await fetch(image);
      const blob = await resp.blob();
      const storageRef = ref(storage, 'commuplace/' + Date.now() + '.jpg');

      uploadBytes(storageRef, blob).then(() => {
        getDownloadURL(storageRef).then(async (downloadUrl) => {
          values.image = downloadUrl;
          values.userName = user?.fullName;
          values.userEmail = user?.primaryEmailAddress?.emailAddress;
          values.userImage = user?.imageUrl;
          await addDoc(collection(db, 'Product'), values)
            .then((docRef) => {
              if (docRef.id) {
                setLoading(false);
                resetForm();
                setImage(null);
                Alert.alert('Success', 'Post Added Successfully.');
              }
            })
            .catch((error) => {
              Alert.alert('Error', error);
              console.error('Error adding document: ', error);
            });
        });
      });
    } catch (error) {
      throw error;
    }
  };

  return (
    <KeyboardAvoidingView>
      <ScrollEvent>
        <FormProduct
          initialValues={initialValues}
          handleSaveProduct={handleSaveProduct}
          handleChangeImage={handleChangeImage}
          image={image}
          categoryList={categoryList}
          loading={loading}
        />
      </ScrollEvent>
    </KeyboardAvoidingView>
  );
};

export default AddProduct;
