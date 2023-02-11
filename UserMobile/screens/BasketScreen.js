import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  Alert,
} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';
import BasketDishItem from '../components/BasketDishItem';
import axios from 'axios';
import {useAuthContext} from '../src/Context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoader from '../components/AppLoader';
import Fontisto from 'react-native-vector-icons/Fontisto';

const BasketScreen = () => {
  // const [dish, setDish] = useState([]);
  // const [price, setPrice] = useState(null);
  const navigation = useNavigation();
  const {users, tokens, getData, onCreateOrder, dish, price, loginPending} =
    useAuthContext();
  const [isEmpty, setIsEmpty] = useState(undefined);
  const [quantity, setQuantity] = useState(0);
  const [loadingPending, setLoadingPending] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    onCreateOrder();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  useEffect(() => {
    onCreateOrder();
  }, []);

  const createOrder = async () => {
    const response = await axios.post(
      `http://65.0.189.107:8000/api/v1/user/${users}/createorder`,
      {},
      {headers: {Authorization: `Bearer ${tokens}`}},
    );
    if (response.data.res == 'success') {
      navigation.navigate('Payment', {price: price});
    } else {
      Alert.alert(
        'Some Dishes which you have added in your cart is not available',
      );
    }
  };

  return (
    <>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={{padding: 10, backgroundColor: 'white'}}>
        <View
          style={{
            marginBottom: 8,
            marginTop: 10,
            justifyContent: 'center',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Fontisto
            name="shopping-basket"
            size={18}
            color={'#000000'}
            style={{marginRight: 5}}
          />
          <Text
            style={{
              fontSize: 21,
              marginLeft: 5,
              color: 'black',
              fontFamily: 'Fredoka-Regular',
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
          disabled={dish ? false : true}
          style={{
            backgroundColor: dish ? '#f35858' : '#cfa6a1',
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
              fontSize: 15,
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
