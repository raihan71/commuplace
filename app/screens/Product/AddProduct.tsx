import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import images from '@/app/constants/images';

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

const AddProduct = () => {
  const handleImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
      });

      if (!result.canceled) {
        console.log(result.assets[0].uri);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView className="p-10 bg-white ">
        <Text className="font-bold text-2xl">Add New Post</Text>
        <Text className="text-base text-gray-500 mb-5">Create New Post</Text>
        <View>
          <TouchableOpacity onPress={handleImage}>
            <Image
              style={{ width: 100, height: 100, borderRadius: 15 }}
              source={images.image.placeholder}
            />
          </TouchableOpacity>
          <TextInput style={styles.input} placeholder="Title" />
          <TextInput style={styles.input} placeholder="Description" />
          <TextInput style={styles.input} placeholder="Price" />
          <TouchableOpacity className="bg-indigo-500 p-3 rounded-md mt-5">
            <Text className="text-white text-center">Simpan</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddProduct;
