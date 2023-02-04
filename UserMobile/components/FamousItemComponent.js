import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Pressable,
  ImageBackground,
  Modal,
  ScrollView,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
// import {useAuthContext} from '../../src/Context/AuthContext';
import {useAuthContext} from '../src/Context/AuthContext';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FamousItemComponent = ({food}) => {
  const navigation = useNavigation();
  const [dishes, setDishes] = useState(null);
  const rating = `${food.rating.$numberDecimal}`;
  const {dbUser, tokens, getData: gt, onCreateOrder} = useAuthContext();
  const [modal, setModal] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const id = food._id;
  const userID = dbUser?.userID;

  const fetchDishDetail = async data => {
    const response = await axios.post(
      `http://3.216.172.228:6500/api/v1/canteen/dish/${id}`,
      {},
      {headers: {Authorization: `Bearer ${tokens}`}},
    );
    const jsonResponse = response.data.data;
    setDishes(jsonResponse);
  };

  const onAddToBasket = async () => {
    setModal(false);
    const response = await axios.patch(
      `http://65.0.189.107:8000/api/v1/user/${userID}/cart`,
      {itemId: id, qty: quantity, price: dishes?.price * quantity},
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
    return (dishes?.price * quantity).toFixed(0);
  };

  const onPress = async () => {
    setModal(true);
    await fetchDishDetail();
  };
  return (
    <>
      <Pressable onPress={onPress}>
        <View
          style={{
            width: 65,
            height: 65,
            borderRadius: 35,
            margin: 10,
            marginBottom: 40,
          }}>
          <Image
            style={{height: '100%', width: '100%', borderRadius: 50}}
            source={{
              uri: food?.imageUrl,
            }}></Image>
          <Text
            style={{
              alignSelf: 'center',
              alignContent: 'center',
              textAlign: 'center',
              marginTop: 8,
              fontSize: 12,
              color: 'black',
              fontFamily: 'Fredoka-Regular',
            }}
            numberOfLines={2}>
            {food?.name}
          </Text>
        </View>
      </Pressable>
      <Modal transparent={true} visible={modal} animationType={'slide'}>
        <View style={{flex: 1, backgroundColor: '#000000aa'}}>
          <Pressable
            style={{height: 175}}
            onPress={() => setModal(false)}></Pressable>
          <View
            style={{
              backgroundColor: '#ffffff',
              height: '100%',
              borderTopLeftRadius: 50,
              borderTopRightRadius: 50,
            }}>
            <View style={{height: 208}}>
              <Image
                source={{
                  uri: food?.imageUrl,
                }}
                style={{
                  height: '100%',
                  width: '100%',
                  borderTopLeftRadius: 38,
                  borderTopRightRadius: 38,
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
                      fontSize: 16,
                      fontFamily: 'Fredoka-Medium',
                      alignSelf: 'center',
                    }}>
                    {food?.name}😋
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
                  <Entypo name="stopwatch" size={18} color={'#f35858'} />
                  <Text
                    style={{
                      marginHorizontal: 7,
                      color: 'black',
                      fontSize: 12,
                    }}>
                    50 mins
                  </Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <AntDesign name="star" size={18} color={'orange'} />
                  <Text
                    style={{
                      marginHorizontal: 7,
                      color: 'black',
                      fontSize: 12,
                    }}>
                    {rating}
                  </Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Entypo name="leaf" size={18} color={'green'} />
                  <Text
                    style={{
                      marginHorizontal: 7,
                      color: 'black',
                      fontSize: 12,
                      fontFamily: 'Fredoka-Regular',
                    }}>
                    Pure Veg.
                  </Text>
                </View>
              </View>
              <View
                style={{
                  marginHorizontal: 120,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                  marginTop: 10,
                  // paddingHorizontal: 10,
                }}>
                <TouchableOpacity style={{margin: 10}} onPress={onMinus}>
                  <Text style={{color: 'gray', fontSize: 22}}>-</Text>
                </TouchableOpacity>
                <View
                  style={{
                    margin: 10,
                    borderRadius: 10,
                  }}>
                  <Text
                    style={{
                      color: '#f35858',
                      fontSize: 17,
                      fontWeight: 'bold',
                    }}>
                    {quantity}
                  </Text>
                </View>
                <TouchableOpacity style={{margin: 10}} onPress={onPlus}>
                  <Text style={{color: 'gray', fontSize: 22}}>+</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={{
                  marginHorizontal: 10,
                  backgroundColor: '#f35858',
                  borderRadius: 5,
                  marginTop: 10,
                  padding: 10,
                  paddingHorizontal: 25,
                  alignItems: 'center',
                }}
                onPress={onAddToBasket}>
                <Text
                  style={{
                    color: 'white',
                    fontWeight: '500',
                    fontSize: 16,
                    fontFamily: 'Fredoka-Regular',
                  }}>
                  ADD {quantity} item - {'\u20B9'} {getTotal()}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default FamousItemComponent;
