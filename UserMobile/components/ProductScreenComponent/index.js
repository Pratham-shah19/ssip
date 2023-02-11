import React, {useEffect, useState, useCallback} from 'react';
import {
  RefreshControl,
  View,
  Text,
  Image,
  TouchableOpacity,
  Pressable,
  ImageBackground,
  Modal,
  ToastAndroid,
  ScrollView,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {useAuthContext} from '../../src/Context/AuthContext';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProductScreenComponent = ({dish}) => {
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();
  const [dishes, setDishes] = useState(null);
  const rating = `${dish.rating.$numberDecimal}`;
  const {dbUser, tokens, getData: gt, onCreateOrder} = useAuthContext();
  const [modal, setModal] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const id = dish._id;
  const userID = dbUser?.userID;
  const DEFAULT_IMAGE =
    'https://www.archanaskitchen.com/images/archanaskitchen/1-Author/Waagmi_Soni/Gralic_Crust_Veggie_Pizza.jpg';

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
    await showToastWithGravityAndOffset();
  };

  const showToastWithGravityAndOffset = async () => {
    ToastAndroid.showWithGravityAndOffset(
      'Dish added to cart!',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
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
      <Pressable
        style={{
          height: 140,
          paddingVertical: 7,
          paddingHorizontal: 13,
          flexDirection: 'row',
          backgroundColor: 'white',
        }}
        // disabled={dish.isAvailable ? false : true}
        onPress={onPress}>
        <View style={{flex: 4}}>
          <View>
            <Image
              style={{
                height: 13,
                width: 13,
                borderRadius: 2,
                tintColor: 'green',
                // opacity: dish.isAvailable ? 1 : 0.2,
              }}
              source={{
                uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Indian-vegetarian-mark.svg/768px-Indian-vegetarian-mark.svg.png',
              }}
            />
          </View>
          <View style={{}}>
            <Text
              style={{
                fontSize: 13,
                fontFamily: 'Fredoka-Regular',
                marginTop: 7,
                color: 'black',
              }}>
              {dish.name}
            </Text>
          </View>
          <View>
            <Text
              style={{
                fontSize: 11,
                color: 'gray',
                marginTop: 7,
                fontFamily: 'Fredoka-Regular',
              }}>
              {dish.category}
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={{
                borderWidth: 1,
                backgroundColor: '#fcfcf2',
                borderColor: '#fce651',
                padding: 1,
                borderRadius: 4,
                alignItems: 'center',
                width: 90,
                marginTop: 7,
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                {[0, 0, 0, 0, 0].map((el, i) => (
                  <FontAwesome
                    style={{margin: 0.5}}
                    name={i < Math.floor(rating) ? 'star' : 'star-o'}
                    size={11}
                    color={'#fabe1b'}
                  />
                ))}
              </View>
            </View>
            <View>
              <Text
                style={{
                  fontSize: 10,
                  color: '#696965',
                  marginTop: 6,
                  marginHorizontal: 3,
                }}>
                ({dish?.noOfRating})
              </Text>
            </View>
          </View>
          <View style={{justifyContent: 'center', marginTop: 7}}>
            <Text style={{fontSize: 11, fontWeight: '400', color: 'black'}}>
              {'\u20B9'}
              <Text style={{fontSize: 11, color: 'black'}}>{dish.price}</Text>
            </Text>
          </View>
          <View style={{marginTop: 0}}>
            <Text
              style={{
                fontSize: 12,
                color: '#4f4f4d',
                fontFamily: 'Fredoka-Regular',
              }}>
              {/* {dish.productDescription} */}
            </Text>
          </View>
        </View>
        <View style={{flex: 1, marginTop: 5, marginRight: 10}}>
          <ImageBackground
            source={{
              uri: dish?.imageUrl,
            }}
            imageStyle={{opacity: 1, borderRadius: 10}}
            resizeMode={'cover'}
            style={{
              backgroundColor: 'transparent',
              borderRadius: 10,
              width: 80,
              height: 80,
            }}
          />
          <View
            style={{
              backgroundColor: 'red',
              paddingHorizontal: 4,
              paddingVertical: 2,
              position: 'absolute',
              borderRadius: 3,
              top: '8%',
              right: '28%',
              alignItems: 'center',
              opacity: 0,
            }}>
            <Text
              style={{
                color: 'white',
                fontFamily: 'Fredoka-Medium',
                fontSize: 9,
              }}>
              Not Available
            </Text>
          </View>

          <View
            style={{
              height: 28,
              width: 75,
              position: 'absolute',
              top: '55%',
              left: '3%',
              backgroundColor: '#faf2f2',
              borderColor: '#f35858',
              borderWidth: 1,
              alignItems: 'center',
              justifyContent: 'center',
              alignContent: 'center',
              borderRadius: 9,
            }}>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  color: dish.isAvailable ? '#f35858' : 'grey',
                  fontFamily: 'Fredoka-Medium',
                  fontSize: 12,
                }}>
                ADD
              </Text>
              <Text
                style={{
                  color: '#f35858',
                  fontWeight: '500',
                  position: 'absolute',
                  top: '-32%',
                  fontSize: 12,
                  left: '50%',
                }}>
                +
              </Text>
            </View>
          </View>
          <View style={{position: 'absolute', top: '80%', left: '12%'}}>
            <Text
              style={{
                fontSize: 10,
                color: '#848385',
                fontFamily: 'Fredoka-Regular',
              }}>
              customizable
            </Text>
          </View>
        </View>
      </Pressable>
      <Modal transparent={true} visible={modal} animationType={'slide'}>
        <View style={{flex: 1, backgroundColor: '#000000aa'}}>
          <View style={{height: 175, alignItems: 'center'}}>
            {/* // onPress={() => setModal(false)}> */}
            <Pressable
              onPress={() => setModal(false)}
              style={{
                backgroundColor: 'white',
                height: 35,
                width: 35,
                padding: 7,
                borderRadius: 17,
                alignItems: 'center',
                marginTop: 90,
              }}>
              <Entypo name="cross" size={21} color={'#000000'} />
            </Pressable>
          </View>
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
                  uri: dish?.imageUrl,
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
                  {/* <Text
                    style={{
                      fontSize: 10,
                      color: '#696965',
                      marginTop: 6,
                      marginHorizontal: 3,
                    }}>
                    {dish?.noOfRating}
                  </Text> */}
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

export default ProductScreenComponent;
