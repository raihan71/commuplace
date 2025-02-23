import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useStatusBar from '@/app/hooks/useStatusBar';
import colors from '@/app/constants/colors';
import NotFound from '@/app/components/NotFound';
import { updateCartItems } from '@/app/reducers/cartSlice';
import FormCart from '@/app/components/Forms/FormCart';
import ScrollEvent from '../components/ScrollEvent';

const AddCart = () => {
  const navigation = useNavigation<any>();
  useStatusBar('dark-content', colors.white);
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: 'Minimal Desk Lamp',
      price: 89.99,
      quantity: 1,
      image: '/api/placeholder/100/100',
    },
    {
      id: 2,
      title: 'Modern Coffee Table',
      price: 299.99,
      quantity: 2,
      image: '/api/placeholder/100/100',
    },
  ]);
  const dispatch = useDispatch();

  const updateQuantity = async (index: number, change: number) => {
    const newItems = cartItems.map((item, i) =>
      i === index ?
        { ...item, quantity: Math.max(1, item.quantity + change) }
      : item,
    );
    setCartItems(newItems);
    try {
      await AsyncStorage.setItem('my-cart', JSON.stringify(newItems));
      dispatch(updateCartItems(newItems));
    } catch (e) {
      alert(`Error updating storage: ${e}`);
    }
  };

  const removeItem = async (index: number) => {
    const newItems = cartItems.filter((_, i) => i !== index);
    setCartItems(newItems);
    try {
      await AsyncStorage.setItem('my-cart', JSON.stringify(newItems));
      dispatch(updateCartItems(newItems));
    } catch (e) {
      alert(`Error removing item from storage: ${e}`);
    }
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item?.price * item?.quantity,
    0,
  );

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('my-cart');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      throw e;
    }
  };

  useEffect(() => {
    getData().then((data) => {
      if (data) {
        setCartItems(data);
      }
    });
  }, [getData]);

  const handleCheckout = () => {
    navigation.navigate('Checkout');
  };

  const renderCart = (
    <ScrollEvent>
      <FormCart
        cartItems={cartItems}
        total={total}
        updateQuantity={updateQuantity}
        removeItem={removeItem}
        handleCheckout={handleCheckout}
      />
    </ScrollEvent>
  );

  return (
    <>
      {cartItems.length > 0 ?
        renderCart
      : <NotFound
          title="Keranjang Belanja Kosong"
          message="Yuk Mulai Belanja 🙏"
        />
      }
    </>
  );
};

export default AddCart;
