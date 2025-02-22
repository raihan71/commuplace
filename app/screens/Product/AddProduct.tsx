import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { Formik } from 'formik';
import * as Yup from 'yup';
import images from '@/app/constants/images';
import colors from '@/app/constants/colors';
import { getFirestore, getDocs, collection, addDoc } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import firebaseConfig from '@/firebaseConfig';
import { useUser } from '@clerk/clerk-expo';
import useStatusBar from '@/app/hooks/useStatusBar';

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  price: Yup.string().required('Price is required'),
  category: Yup.string().required('Category is required'),
});

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    paddingTop: 15,

    marginTop: 10,
    marginBottom: 5,
    paddingHorizontal: 17,
    textAlignVertical: 'top',
  },
});

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
    cratedAt: Date.now(),
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
          await addDoc(collection(db, 'UserPost'), values)
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
      <ScrollView>
        <View className="px-5 bg-white">
          <Text className="font-semibold text-lg">Tambah Produk Baru</Text>
          <Text className="text-base text-gray-500 mb-2.5">
            Buat produk baru untuk dijual
          </Text>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) =>
              handleSaveProduct(values, resetForm)
            }>
            {({
              handleChange,
              handleBlur,
              setFieldValue,
              handleSubmit,
              errors,
              touched,
              values,
            }: any) => (
              <View>
                <TouchableOpacity className="pb-2" onPress={handleChangeImage}>
                  {image ?
                    <Image
                      style={{ width: 100, height: 100, borderRadius: 15 }}
                      source={{ uri: image }}
                    />
                  : <Image
                      style={{ width: 100, height: 100, borderRadius: 15 }}
                      source={images.image.placeholder}
                    />
                  }
                </TouchableOpacity>
                <TextInput
                  className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Nama Produk"
                  onChangeText={handleChange('title')}
                  onBlur={handleBlur('title')}
                  value={values.title}
                  style={styles.input}
                />
                {errors.title && touched.title ?
                  <Text className="text-red-500">{errors.title}</Text>
                : ''}
                <TextInput
                  className="h-20 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Deskripsi"
                  onChangeText={handleChange('description')}
                  onBlur={handleBlur('description')}
                  value={values.description}
                  numberOfLines={10}
                  multiline={true}
                  style={styles.input}
                />
                {errors.description && touched.description ?
                  <Text className="text-red-500">{errors.description}</Text>
                : ''}
                <TextInput
                  className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Harga"
                  keyboardType="number-pad"
                  onChangeText={handleChange('price')}
                  onBlur={handleBlur('price')}
                  value={values.price}
                  style={styles.input}
                />
                {errors.price && touched.price ?
                  <Text className="text-red-500">{errors.price}</Text>
                : ''}
                <View className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 mt-3">
                  <Picker
                    selectedValue={values.category}
                    onValueChange={(val) => setFieldValue('category', val)}
                    mode="dropdown">
                    <Picker.Item label="Pilih kategori" value="" />
                    {categoryList.length > 0 &&
                      categoryList?.map((item, index) => (
                        <Picker.Item
                          key={index}
                          label={item?.name}
                          value={item?.name}
                        />
                      ))}
                  </Picker>
                </View>
                {errors.category && touched.category ?
                  <Text className="text-red-500">{errors.category}</Text>
                : ''}
                <TouchableOpacity
                  disabled={loading}
                  onPress={loading ? undefined : handleSubmit}
                  className="bg-indigo-500 p-3 rounded-md my-5">
                  {loading ?
                    <ActivityIndicator color={colors.white} />
                  : <Text className="text-white text-center font-semibold">
                      Simpan
                    </Text>
                  }
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddProduct;
