import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import BasketDishItem from '../components/BasketDishItem';
import axios from 'axios';
import {useAuthContext} from '../src/Context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoader from '../components/AppLoader';

const BasketScreen = () => {
  // const [dish, setDish] = useState([]);
  // const [price, setPrice] = useState(null);
  const navigation = useNavigation();
  const {users, tokens, getData, onCreateOrder, dish, price, loginPending} =
    useAuthContext();
  const [isEmpty, setIsEmpty] = useState(undefined);
  const [quantity, setQuantity] = useState(0);
  const [loadingPending, setLoadingPending] = useState(false);

  useEffect(() => {
    onCreateOrder();
  }, [dish]);

  const createOrder = () => {
    navigation.navigate('Payment', {price: price});
  };

  return (
    <>
      <ScrollView style={{padding: 10}}>
        <View style={{marginBottom: 8, marginTop: 10}}>
          <Text
            style={{
              fontSize: 24,
              color: 'black',
              fontFamily: 'Fredoka-Regular',
              alignSelf: 'center',
            }}>
            Your Basket
          </Text>
        </View>
        <View style={{marginBottom: 10}}>
          <Text
            style={{
              color: 'black',
              fontSize: 16,
              fontFamily: 'Fredoka-Regular',
            }}>
            Your Items:
          </Text>
        </View>
        <FlatList
          data={dish}
          renderItem={({item}) => <BasketDishItem basketDish={item} />}
          showsVerticalScrollIndicator={false}
        />
        <TouchableOpacity
          style={{
            backgroundColor: '#f35858',
            borderRadius: 5,
            padding: 10,
            paddingHorizontal: 28,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 60,
          }}
          onPress={createOrder}>
          <Text
            style={{
              color: 'white',
              fontWeight: '500',
              fontSize: 15,
              fontFamily: 'Fredoka-Regular',
            }}>
            Create Order &#8226; Rs.
          </Text>
          <Text
            style={{
              color: 'white',
              fontWeight: '400',
              fontSize: 17,
            }}>
            {price}
          </Text>
        </TouchableOpacity>
      </ScrollView>
      {loginPending ? <AppLoader /> : null}
    </>
  );
};

export default BasketScreen;
