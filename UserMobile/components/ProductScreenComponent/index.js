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
import {useAuthContext} from '../../src/Context/AuthContext';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProductScreenComponent = ({dish}) => {
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
      <Pressable
        style={{
          height: 140,
          paddingVertical: 7,
          paddingHorizontal: 13,
          flexDirection: 'row',
          backgroundColor: dish.isAvailable ? 'white' : '#ededed',
        }}
        disabled={dish.isAvailable ? false : true}
        onPress={onPress}>
        <View style={{flex: 4}}>
          <View>
            <Image
              style={{
                height: 13,
                width: 13,
                borderRadius: 2,
                tintColor: dish.isAvailable ? 'green' : 'grey',
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
          <View
            style={{
              borderWidth: 1,
              backgroundColor: '#fcfcf2',
              borderColor: dish.isAvailable ? '#fce651' : 'grey',
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
                  color={dish.isAvailable ? '#fabe1b' : 'grey'}
                />
              ))}

              <Text
                style={{
                  fontSize: 11,
                  color: '#696965',
                  fontWeight: 'bold',
                  marginHorizontal: 3,
                }}>
                {/* {dish?.rating} */}
              </Text>
            </View>
          </View>
          <View style={{justifyContent: 'center', marginTop: 7}}>
            <Text style={{fontSize: 12, fontWeight: '400', color: 'black'}}>
              {'\u20B9'}
              <Text style={{fontSize: 13, color: 'black'}}>{dish.price}</Text>
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
            imageStyle={{opacity: dish.isAvailable ? 1 : 0.4, borderRadius: 10}}
            resizeMode={'cover'}
            style={{
              backgroundColor: dish.isAvailable
                ? 'transparent'
                : 'rgba(0, 0, 0, 233)',
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
              opacity: dish.isAvailable ? 0 : 1,
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
              borderColor: dish.isAvailable ? '#f35858' : 'grey',
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
                  color: dish.isAvailable ? '#f35858' : 'grey',
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
          <View style={{position: 'absolute', top: '80%', left: '8%'}}>
            <Text
              style={{
                fontSize: 11,
                color: '#848385',
                fontFamily: 'Fredoka-Regular',
              }}>
              customizable
            </Text>
          </View>
        </View>
      </Pressable>
      <Modal transparent={true} visible={modal} animationType={'slide'}>
        <Pressable
          style={{
            backgroundColor: '#000000aa',
            paddingTop: 200,
            // paddingBottom: 10,
          }}
          onPress={() => setModal(false)}>
          {/* <View style={{borderTopRightRadius: 20}}> */}
          <View style={{height: 215}}>
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
                <Text
                  style={{
                    marginHorizontal: 7,
                    color: 'black',
                    fontSize: 14,
                  }}>
                  50 mins
                </Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <AntDesign name="star" size={23} color={'orange'} />
                <Text
                  style={{
                    marginHorizontal: 7,
                    color: 'black',
                    fontSize: 14,
                  }}>
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
            {/* 
            <View style={{margin: 15, marginTop: 20}}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 15,
                  lineHeight: 20,
                  fontFamily: 'Fredoka-Regular',
                }}></Text> */}
            {/* </View> */}
            <View
              style={{
                marginHorizontal: 120,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
                // paddingHorizontal: 10,
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
            <TouchableOpacity
              style={{
                marginHorizontal: 10,
                backgroundColor: '#f35858',
                borderRadius: 5,
                // marginTop: 'auto',
                padding: 10,
                paddingHorizontal: 25,
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
          {/* </View> */}
        </Pressable>
      </Modal>
    </>
  );
};

export default ProductScreenComponent;
