import React, { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Picker } from '@react-native-picker/picker';
import { getFirestore, getDocs, collection, addDoc } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import firebaseConfig from '@/firebaseConfig';
import { useUser } from '@clerk/clerk-expo';
import colors from '@/app/constants/colors';

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
    fontSize: 17,
  },
});

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Judul wajib diisi'),
  description: Yup.string().required('Description is required'),
  category: Yup.string().required('Category is required'),
  price: Yup.number().required('Price is required'),
});

const AddProduct = () => {
  const db = getFirestore(firebaseConfig);
  const [categoryList, setCategoryList] = useState<any[]>([]);
  const [image, setImage] = useState<any>();
  const [loading, setLoading] = useState(false);
  const storage = getStorage();
  const { user } = useUser();

  useEffect(() => {
    getCategoryList();
  }, []);

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

  const getCategoryList = async () => {
    setCategoryList([]);
    const querySnapshot = await getDocs(collection(db, 'Category'));
    querySnapshot.forEach((doc) => {
      setCategoryList((categoryList) => [...categoryList, doc.data()]);
    });
  };

  const handleSaveProduct = async (value: any, resetForm: any) => {
    try {
      setLoading(true);
      const resp = await fetch(image);
      const blob = await resp.blob();
      const storageRef = ref(storage, 'imageproduct/' + Date.now() + '.jpg');
      uploadBytes(storageRef, blob).then(async (snapshot) => {
        getDownloadURL(snapshot.ref).then(async (url) => {
          await addDoc(collection(db, 'Product'), {
            title: value.title,
            description: value.description,
            price: value.price,
            category: value.category,
            image: url,
            userName: user?.fullName,
            userImage: user?.imageUrl,
          })
            .then((docRef) => {
              if (docRef.id) {
                Alert.alert('Success', 'Product has been added successfully');
                setLoading(false);
                setImage(null);
                resetForm();
              }
            })
            .catch((error) => {
              throw error;
            });
        });
      });
    } catch (error) {
      throw error;
    }
  };

  const initialValues = {
    title: '',
    description: '',
    price: '',
    category: '',
  };

  return (
    <SafeAreaView>
      <KeyboardAvoidingView>
        <ScrollView>
          <View className="p-5 bg-white">
            <Text className="font-bold text-2xl">Add New Product</Text>
            <Text className="text-base text-gray-500 mb-5">
              Create New Product & Start Selling
            </Text>
            <Formik
              initialValues={initialValues}
              onSubmit={(values, { resetForm }) =>
                handleSaveProduct(values, resetForm)
              }
              validationSchema={validationSchema}>
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                setFieldValue,
                errors,
                touched,
              }: any) => (
                <View>
                  <TouchableOpacity onPress={handleChangeImage}>
                    {image ?
                      <Image
                        source={{ uri: image }}
                        style={{ width: 100, height: 100 }}
                      />
                    : <Image
                        style={{ width: 100, height: 100, borderRadius: 15 }}
                        source={require('../../../assets/images/placeholder.jpg')}
                      />
                    }
                  </TouchableOpacity>
                  <TextInput
                    onChangeText={handleChange('title')}
                    onBlur={handleBlur('title')}
                    value={values?.title}
                    style={styles.input}
                    placeholder="Title"
                  />
                  {errors.title && touched.title ?
                    <Text className="text-red-500">{errors.title}</Text>
                  : ''}
                  <TextInput
                    className="h-24"
                    style={styles.input}
                    placeholder="Description"
                    onChangeText={handleChange('description')}
                    onBlur={handleBlur('description')}
                    value={values?.description}
                    numberOfLines={10}
                    multiline={true}
                  />
                  {errors.description && touched.description ?
                    <Text className="text-red-500">{errors.description}</Text>
                  : ''}
                  <TextInput
                    style={styles.input}
                    placeholder="Price"
                    keyboardType="number-pad"
                    onChangeText={handleChange('price')}
                    onBlur={handleBlur('price')}
                    value={values?.price}
                  />
                  {errors.price && touched.price ?
                    <Text className="text-red-500">{errors.price}</Text>
                  : ''}
                  <View className="border border-gray-700 mt-3 rounded-lg">
                    <Picker
                      selectedValue={values?.category}
                      onValueChange={(val: string) =>
                        setFieldValue('category', val)
                      }
                      mode="dropdown">
                      <Picker.Item label="Choose category" value="" />
                      {categoryList?.map((category, index) => (
                        <Picker.Item
                          key={index}
                          label={category.name}
                          value={category.name}
                        />
                      ))}
                    </Picker>
                  </View>
                  {errors.category && touched.category ?
                    <Text className="text-red-500">{errors.category}</Text>
                  : ''}
                  <TouchableOpacity
                    disabled={loading}
                    onPress={handleSubmit}
                    className="bg-indigo-500 p-3 rounded-md mt-5">
                    {loading ?
                      <ActivityIndicator color={colors.white} />
                    : <Text className="text-white text-center">Simpan</Text>}
                  </TouchableOpacity>
                </View>
              )}
            </Formik>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddProduct;
