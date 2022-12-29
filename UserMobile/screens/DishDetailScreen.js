import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useRoute, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAuthContext} from '../src/Context/AuthContext';
import axios from 'axios';

const DishDetailScreen = () => {
  const [dish, setDish] = useState(null);
  const {dbUser, tokens, getData: gt, onCreateOrder} = useAuthContext();
  const [quantity, setQuantity] = useState(1);
  const rating = `${dish?.rating?.$numberDecimal}`;
  const navigation = useNavigation();
  const route = useRoute();
  const id = route.params?.id;
  const userID = dbUser?.userID;
  useEffect(() => {
    fetchDishDetail();
  }, []);

  // let jsonValue;
  // const getData = async () => {
  //   const value = await AsyncStorage.getItem('userDetail');
  //   jsonValue = JSON.parse(value);
  // };
  const fetchDishDetail = async data => {
    const response = await axios.post(
      `http://10.0.2.2:6000/api/v1/canteen/dish/${id}`,
      {},
      {headers: {Authorization: `Bearer ${tokens}`}},
    );
    const jsonResponse = response.data.data;
    setDish(jsonResponse);
  };

  const onAddToBasket = async () => {
    const response = await axios.patch(
      `http://10.0.2.2:8000/api/v1/user/${userID}/cart`,
      {itemId: id, qty: quantity, price: dish?.price * quantity},
      {headers: {Authorization: `Bearer ${dbUser?.token}`}},
    );
    await onCreateOrder();
    navigation.goBack();
  };

  const onMinus = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const onPlus = () => {
    setQuantity(quantity + 1);
  };
  const getTotal = () => {
    return (dish?.price * quantity).toFixed(0);
  };

  return (
    <View>
      <ScrollView style={{}} showsVerticalScrollIndicator={false}>
        <View style={{height: 290}}>
          <Image
            source={{
              uri: dish?.imageUrl,
            }}
            style={{
              height: '100%',
              width: '100%',
            }}
          />
        </View>

        <View style={{backgroundColor: 'white'}}>
          <View
            style={{
              marginTop: 20,
            }}>
            <View style={{alignSelf: 'center'}}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 23,
                  fontFamily: 'Fredoka-Medium',
                  alignSelf: 'center',
                }}>
                {dish?.name}😋
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              marginTop: 18,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Entypo name="stopwatch" size={23} color={'#f35858'} />
              <Text style={{marginHorizontal: 7, color: 'black', fontSize: 14}}>
                50 mins
              </Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <AntDesign name="star" size={23} color={'orange'} />
              <Text style={{marginHorizontal: 7, color: 'black', fontSize: 14}}>
                {rating}
              </Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Entypo name="leaf" size={23} color={'green'} />
              <Text
                style={{
                  marginHorizontal: 7,
                  color: 'black',
                  fontSize: 14,
                  fontFamily: 'Fredoka-Regular',
                }}>
                Pure Veg.
              </Text>
            </View>
          </View>

          <View style={{margin: 15, marginTop: 20}}>
            <Text
              style={{
                color: 'black',
                fontSize: 15,
                lineHeight: 20,
                fontFamily: 'Fredoka-Regular',
              }}></Text>
          </View>
          <View
            style={{
              marginHorizontal: 120,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              paddingHorizontal: 10,
            }}>
            <TouchableOpacity style={{margin: 10}} onPress={onMinus}>
              <Text style={{color: 'gray', fontSize: 27}}>-</Text>
            </TouchableOpacity>
            <View
              style={{
                margin: 10,
                borderRadius: 10,
              }}>
              <Text
                style={{
                  color: '#f35858',
                  fontSize: 23,
                  fontWeight: 'bold',
                }}>
                {quantity}
              </Text>
            </View>
            <TouchableOpacity style={{margin: 10}} onPress={onPlus}>
              <Text style={{color: 'gray', fontSize: 27}}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        style={{
          marginHorizontal: 10,
          backgroundColor: '#f35858',
          borderRadius: 5,
          marginTop: 'auto',
          padding: 10,
          paddingHorizontal: 28,
          alignItems: 'center',
        }}
        onPress={onAddToBasket}>
        <Text
          style={{
            color: 'white',
            fontWeight: '500',
            fontSize: 19,
            fontFamily: 'Fredoka-Regular',
          }}>
          ADD {quantity} item - {'\u20B9'} {getTotal()}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default DishDetailScreen;
