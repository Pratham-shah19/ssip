import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Pressable,
  ImageBackground,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {useAuthContext} from '../../src/Context/AuthContext';

const ProductScreenComponent = ({dish}) => {
  // const [iceCream, setIceCream] = useState([]);
  // const [isAvailable, setIsAvailable] = useState();
  // const {tokens} = useAuthContext();
  // useEffect(() => {
  //   fetchDishess();
  // }, []);
  const navigation = useNavigation();
  const rating = `${dish.rating.$numberDecimal}`;
  const DEFAULT_IMAGE =
    'https://www.archanaskitchen.com/images/archanaskitchen/1-Author/Waagmi_Soni/Gralic_Crust_Veggie_Pizza.jpg';

  // const fetchDishess = async () => {
  //   const response = await axios.post(
  //     `http://10.0.2.2:6000/api/v1/canteen/dishes/category`,
  //     {},
  //     {headers: {Authorization: `Bearer ${tokens}`}},
  //   );
  //   // console.log(response);
  //   const jsonResponse = await `{response?.data?.data?.${component}}`;
  //   console.log(jsonResponse);
  //   setIceCream(jsonResponse);
  //   // setIceCream(jsonResponse.IceCream);
  //   // setStarter(jsonResponse.Starter);
  //   // setMainCourse(jsonResponse.MainCourse);
  // };

  return (
    <Pressable
      style={{
        height: 160,
        padding: 13,
        flexDirection: 'row',
        backgroundColor: dish.isAvailable ? 'white' : '#ededed',
      }}
      disabled={dish.isAvailable ? false : true}
      onPress={() => navigation.navigate('DishDetailScreen', {id: dish._id})}>
      <View style={{flex: 3}}>
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
              fontSize: 15,
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
          <Text style={{fontSize: 13, fontWeight: '500', color: 'black'}}>
            {'\u20B9'}
            <Text style={{fontSize: 13, color: 'black'}}>{dish.price}</Text>
          </Text>
        </View>
        <View style={{marginTop: 7}}>
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
        {/* <TouchableOpacity onPress={() => setModalVisible(true)}> */}

        {/* <Image
            style={{
              height: 95,
              width: 95,
              borderRadius: 10,
              tintColor: dish.isAvailable ? 'none' : 'grey',
              opacity: dish.isAvailable ? 1 : 0.1,
            }}
            source={{
              uri: dish?.imageUrl,
            }}
          /> */}
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
            width: 95,
            height: 95,
            // padding: 6,
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
              fontSize: 11,
            }}>
            Not Available
          </Text>
        </View>

        <View
          style={{
            height: 32,
            width: 85,
            position: 'absolute',
            top: '63%',
            left: '6%',
            backgroundColor: '#faf2f2',
            borderColor: dish.isAvailable ? '#f35858' : 'grey',
            borderWidth: 1,
            alignItems: 'center',
            justifyContent: 'center',
            alignContent: 'center',
            borderRadius: 9,
          }}>
          <View
            style={{flexDirection: 'row'}}
            // onPress={() => setModalVisible(true)}>
          >
            <Text
              style={{
                color: dish.isAvailable ? '#f35858' : 'grey',
                fontFamily: 'Fredoka-Medium',
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
        <View style={{position: 'absolute', top: '90%', left: '15%'}}>
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
  );
};

export default ProductScreenComponent;
