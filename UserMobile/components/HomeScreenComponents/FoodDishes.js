import {
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Text,
  Image,
  Pressable,
} from 'react-native';
import React, {useState, useEffect} from 'react';
// import ProductScreenComponent from '../components/ProductScreenComponent';
import ProductScreenComponent from '../ProductScreenComponent';
import Entypo from 'react-native-vector-icons/Entypo';
import {useRoute, useNavigation} from '@react-navigation/native';
import {useAuthContext} from '../../src/Context/AuthContext';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useRef} from 'react';

const FoodDishes = () => {
  // const [dishes, setDishes] = useState([]);
  // const [iceCream, setIceCream] = useState([]);
  // const [starter, setStarter] = useState([]);
  // const [mainCourse, setMainCourse] = useState([]);
  const navigation = useNavigation();
  // let jsonValue;
  // const getData = async () => {
  //   console.log('inside get data:');
  //   const value = await AsyncStorage.getItem('userDetail');
  //   jsonValue = JSON.parse(value);
  //   console.log('user in auth context of famousItem:', jsonValue);
  //   setUsers(jsonValue.userID);
  //   setTokens(jsonValue.token);
  //   console.log('get done');
  // };

  // useEffect(() => {
  //   getData();
  //   setTimeout(() => fetchDishess(), 510);
  // }, []);

  // const fetchDishess = async () => {
  //   const response = await axios.post(
  //     `http://10.0.2.2:6000/api/v1/canteen/dishes/category`,
  //     {},
  //     {headers: {Authorization: `Bearer ${jsonValue.token}`}},
  //   );
  //   const jsonResponse = await response?.data?.data;
  //   setDishes(jsonResponse);
  //   setIceCream(jsonResponse.IceCream);
  //   setStarter(jsonResponse.Starter);
  //   setMainCourse(jsonResponse.MainCourse);
  // };

  return (
    <View>
      <View style={{flexDirection: 'row', alignItems: 'center', padding: 13}}>
        <View
          style={{
            borderRadius: 15,
            borderColor: '#f35858',
            borderWidth: 2,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 3,
          }}>
          <MaterialIcons name="restaurant" size={18} color="black" />
        </View>
        <Text
          style={{
            fontSize: 18,
            fontFamily: 'Fredoka-Medium',
            marginLeft: 4,
            color: 'black',
          }}>
          All Delicious Dishes😋
        </Text>
      </View>
      <TouchableOpacity
        style={{flexDirection: 'row', alignItems: 'center'}}
        onPress={() => navigation.navigate('StarterScreen')}>
        <View
          style={{
            alignContent: 'center',
            alignItems: 'center',
            flex: 1,
            padding: 13,
          }}>
          <Image
            source={{
              uri: 'https://food-images.files.bbci.co.uk/food/recipes/dirty_veggie_starter_89235_16x9.jpg',
            }}
            style={{width: 83, height: 83, borderRadius: 15}}
          />
        </View>
        <View style={{flex: 3}}>
          <Text
            style={{
              color: 'black',
              fontFamily: 'Fredoka-Regular',
              fontSize: 18,
            }}>
            Starter
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={{flexDirection: 'row', alignItems: 'center'}}
        onPress={() => navigation.navigate('MainCourseScreen')}>
        <View
          style={{
            alignContent: 'center',
            alignItems: 'center',
            flex: 1,
            padding: 13,
          }}>
          <Image
            source={{
              uri: 'https://i.pinimg.com/736x/3f/79/da/3f79da595a06fa6f5cfdbb730dde3676.jpg',
            }}
            style={{width: 83, height: 83, borderRadius: 15}}
          />
        </View>
        <View style={{flex: 3}}>
          <Text
            style={{
              color: 'black',
              fontFamily: 'Fredoka-Regular',
              fontSize: 18,
            }}>
            Main Course
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={{flexDirection: 'row', alignItems: 'center'}}
        onPress={() => navigation.navigate('IceCreamScreen')}>
        <View
          style={{
            alignContent: 'center',
            alignItems: 'center',
            flex: 1,
            padding: 13,
          }}>
          <Image
            source={{
              uri: 'https://www.ingredion.com/content/dam/ingredion/other/us/colorblock-images/Solids-Replacement-Icecream-720x560.jpg',
            }}
            style={{width: 83, height: 83, borderRadius: 15}}
          />
        </View>
        <View style={{flex: 3}}>
          <Text
            style={{
              color: 'black',
              fontFamily: 'Fredoka-Regular',
              fontSize: 18,
            }}>
            Ice Cream
          </Text>
        </View>
      </TouchableOpacity>

      {/* <View style={{padding: 10}}>
        <Text
          style={{fontFamily: 'Fredoka-Regular', color: 'black', fontSize: 17}}>
          Ice Cream
        </Text>
      </View>
      <View
        style={{
          backgroundColor: 'grey',
          height: 1,
          marginHorizontal: 15,
        }}></View>
      <FlatList
        data={iceCream}
        renderItem={({item}) => <ProductScreenComponent dish={item} />}
        keyExtractor={item => item.name}
        showsVerticalScrollIndicator={false}
      />
      <View style={{padding: 10}}>
        <Text
          style={{fontFamily: 'Fredoka-Regular', color: 'black', fontSize: 17}}>
          Main Course
        </Text>
      </View>
      <View
        style={{
          backgroundColor: 'grey',
          height: 1,
          marginHorizontal: 15,
        }}></View>
      <FlatList
        data={mainCourse}
        renderItem={({item}) => <ProductScreenComponent dish={item} />}
        keyExtractor={item => item.name}
        showsVerticalScrollIndicator={false}
      /> */}
    </View>
  );
};

export default FoodDishes;
