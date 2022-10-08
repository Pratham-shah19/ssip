import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
// import {useBasketContext} from '../src/Contexts/BasketContext';
// import {useOrderContext} from '../src/Contexts/OrderContext';
import {useNavigation} from '@react-navigation/native';
// import BasketDishItem from '../components/BasketDishScreen/BasketDishItem';
import BasketDishItem from '../components/BasketDishItem';
import axios from 'axios';
import {useAuthContext} from '../src/Context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

const BasketScreen = () => {
  // const {restaurant, basketDishes, totalPrice} = useBasketContext();
  // const {createOrder} = useOrderContext();
  const [dish, setDish] = useState([]);
  const [price, setPrice] = useState(null);
  const navigation = useNavigation();
  const {users, tokens} = useAuthContext();
  const [isEmpty, setIsEmpty] = useState(undefined);
  const [quantity, setQuantity] = useState(0);
  // const users = '633e140b3c019d3208f40d83';
  // const tokens =
  //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzNiMmQ5MjAyOWNkODNlNzQyNGNjZDAiLCJuYW1lIjoiS2FuZGFycCIsImlhdCI6MTY2NTEwODAyNiwiZXhwIjoxNjY3NzAwMDI2fQ.ibs8d_jfKwh0UO1ZnCDxNIfm34un53OdDn8DtNXxqVo';
  // const userID = dbUser?.userID;
  // const token = dbUser?.token;

  // useEffect(() => {
  //   onCreateOrder();
  // }, []);
  useEffect(() => {
    // onBasketEmpty();
    // if (!isEmpty) {
    onCreateOrder();
    // }
    // c/
  }, [dish]);
  // const onBasketEmpty = async () => {
  //   const response = await axios.get(
  //     `http://10.0.2.2:8000/api/v1/user/${userID}/cart`,
  //     {headers: {Authorization: `Bearer ${token}`}},
  //   );
  //   const res = response.data.res;
  //   if (res === 'none') {
  //     setIsEmpty(true);
  //   } else {
  //     setIsEmpty(false);
  //   }
  // };
  const onCreateOrder = async () => {
    // console.log('in oncreate: ', tokens);
    // if (dish && tokens) {
    const response = await axios.get(
      `http://10.0.2.2:8000/api/v1/user/${users}/cart`,
      {
        headers: {
          Authorization: `Bearer ${tokens}`,
        },
      },
    );
    // console.log(response);
    // console.log(response.data.data.data);
    // console.log(response.data.data.price);
    setDish(response.data.data.data);
    // console.log(response.data.data.data);
    setPrice(response.data.data.price);
    // const jsonValue = JSON.stringify(response.data.data.data);
    // const jsonV = JSON.stringify(response.data.data.price);
    // await AsyncStorage.setItem('dish', jsonValue);
    // await AsyncStorage.setItem('price', jsonV);
    // const jso = await AsyncStorage.getItem('dish');
    // const parseJson = JSON.parse(jso);
    // setDish(parseJson);
    // const jsony = await AsyncStorage.getItem('price');
    // const parseJso = JSON.parse(jsony);
    // setPrice(parseJso);
    // setQuantity(quantity + 1);
    // setIsEmpty(false);
    // const newOrder = await createOrder();
    // navigation.navigate('Orders', {
    //   screen: 'OrderDetailNavigator',
    //   params: {id: newOrder.id},
    // });
    // }
  };
  const createOrder = async () => {
    navigation.navigate('Payment', {price: price});
    // await AsyncStorage.removeItem('dish');
    // setDish(null);
  };

  return (
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
      {/* {dish && ( */}
      <FlatList
        data={dish}
        renderItem={({item}) => <BasketDishItem basketDish={item} />}
        showsVerticalScrollIndicator={false}
      />
      {/* )} */}
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
            fontSize: 17,
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
  );
};

export default BasketScreen;
