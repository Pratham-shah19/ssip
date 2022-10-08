import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Pressable,
  TextComponent,
  FlatList,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import FamousItem from '../../data/FamousItem';
import FamousItemComponent from '../FamousItemComponent';
import BestSellers from '../../data/BestSellers';
import {useAuthContext} from '../../src/Context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useRef} from 'react';
import axios from 'axios';

const FamousItems = () => {
  const [dishes, setDishes] = useState([]);
  const [kdishes, setKdishes] = useState([]);
  // const {dbUser} = useAuthContext();
  // const {tokens} = useAuthContext();
  const tokens =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzNiMmQ5MjAyOWNkODNlNzQyNGNjZDAiLCJuYW1lIjoiS2FuZGFycCIsImlhdCI6MTY2NTEwODAyNiwiZXhwIjoxNjY3NzAwMDI2fQ.ibs8d_jfKwh0UO1ZnCDxNIfm34un53OdDn8DtNXxqVo';
  // const token = dbUser?.token;
  // const [dbUser, setDbUser] = useState(null);
  const uploadBtn = useRef();
  // useEffect(() => {
  //   // getData();
  //   setTimeout(() => {
  //     fetchDishes();
  //   }, 1000);
  //   // fetchDishes();
  //   // storeData();
  // }, []);
  // useEffect(() => {
  //   getData();
  // }, []);
  useEffect(() => {
    console.log('inside useEffect:', tokens);
    fetchDishes();
  }, []);
  // const length = dishes?.length;
  // const getData = async () => {
  //   const value = await AsyncStorage.getItem('userDetail');
  //   const jsonValue = JSON.parse(value);
  //   //  if (value != null) {
  //   //    console.log('user in auth context:', jsonValue);
  //   //  setUser(true);
  //   setDbUser(jsonValue.data.token);

  //   // } else {
  //   // setUser(false);
  //   //  }
  // };
  // const fetch = () => {
  //   setTimeout(() => fetchDishes(), 1000);
  // };
  // let count;
  // useEffect(() => {
  //   count = 0;
  // });
  // let count = 0;
  const fetchDishes = async () => {
    // const value = await AsyncStorage.getItem('userDetail');
    // const jsonValue = JSON.parse(value);
    // //  if (value != null) {
    // //    console.log('user in auth context:', jsonValue);
    // //  setUser(true);
    // setDbUser(jsonValue.token);
    // setLoading(true);
    // console.log(dbUser?.token);
    // if (dbUser) {
    // if (count === 0) {
    // count++;
    // fetch(`http://10.0.2.2:6000/api/v1/canteen/dishes/filter?sort=rating`, {
    //   method: 'POST',
    //   headers: {
    //     //this what's exactly look in my postman
    //     Authorization: `Bearer ${token}`,
    //   },
    // })
    //   .then(response => response.json())
    //   .then(responseJson => {
    //     // console.log(responseJson);
    //     var jasonData = responseJson;
    //     var data = jasonData.data;
    //     //     // var iceCream = data.IceCream;
    //     //     // if (dishes != data) {
    //     // var jsonValue = JSON.stringify(data);
    //     // console.log(data);
    //     setDishes(data);
    if (tokens) {
      const response = await axios.post(
        `http://10.0.2.2:6000/api/v1/canteen/dishes/filter?sort=rating`,
        {},
        {headers: {Authorization: `Bearer ${tokens}`}},
      );
      console.log(response);
      const jsonResponse = response?.data?.data;
      console.log(jsonResponse);
      setDishes(jsonResponse);
      // setIceCream(jsonResponse.IceCream);
      // setStarter(jsonResponse.Starter);
      // setMainCourse(jsonResponse.MainCourse);

      //     // setIceCream(iceCream);
      //     // setStarter(data.Starter);
      //     // }
      //     console.log(dishes);

      // }
    }
    // }
    // await AsyncStorage.setItem('famousItems', jsonValue);
  };
  // const storeData = async value => {
  //   try {
  //     const jsonValue = JSON.stringify(dishes);
  //     await AsyncStorage.setItem('famousItems', jsonValue);
  //   } catch (e) {
  //     // saving error
  //   }
  // };
  // const test = () => {
  //   uploadBtn.current.handleOnPress();
  // };

  // const getData = async () => {
  //   try {
  //     const jsonValue = await AsyncStorage.getItem('famousItems');
  //     // return jsonValue != null ? JSON.parse(jsonValue) : null;
  //     const json = JSON.parse(jsonValue);
  //     setKdishes(json);
  //   } catch (e) {
  //     // error reading value
  //   }
  // };
  return (
    <View style={{backgroundColor: 'white'}}>
      <View
        style={{
          flexDirection: 'row',
          marginLeft: 15,
          alignItems: 'center',
          marginTop: 10,
        }}>
        <View style={{}}>
          <Entypo name="emoji-happy" size={23} color="#f35858" />
        </View>
        <View style={{marginHorizontal: 3}}>
          <Text
            style={{
              fontSize: 19,
              marginLeft: 4,
              color: 'black',
              fontFamily: 'Fredoka-Medium',
            }}>
            Eat What Makes You Happy...
          </Text>
        </View>
        <Pressable onPress={() => {}}>
          <Text style={{}}>press</Text>
        </Pressable>
      </View>
      <View>
        <View style={{height: 290, marginLeft: 13}}>
          <ScrollView
            horizontal
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingVertical: 10}}>
            <FlatList
              data={dishes}
              contentContainerStyle={{alignSelf: 'flex-start'}}
              numColumns={Math.ceil(4)}
              scrollEnabled={false}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              style={{marginTop: 10}}
              renderItem={({item}) => (
                <FamousItemComponent
                  // famousFood={item.famousFood}
                  // restaurantImage={item.restaurantImage}
                  food={item}
                />
              )}
              keyExtractor={item => item.name}
            />
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default FamousItems;
