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
  ActivityIndicator,
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
  const [tokens, setTokens] = useState(null);
  const [users, setUsers] = useState(null);
  let jsonValue;

  const getData = async () => {
    // console.log('inside get data:');
    const value = await AsyncStorage.getItem('userDetail');
    jsonValue = JSON.parse(value);
    // console.log('user in auth context of famousItem:', jsonValue);
    setUsers(jsonValue.userID);
    setTokens(jsonValue.token);
    // console.log('get done');
  };
  useEffect(() => {
    getData();
    // console.log('inside famousItem: ');
    setTimeout(() => fetchDishes(), 500);
  }, []);

  const fetchDishes = async () => {
    const response = await axios.post(
      `http://10.0.2.2:6000/api/v1/canteen/dishes/filter?sort=rating`,
      {},
      {headers: {Authorization: `Bearer ${jsonValue.token}`}},
    );
    const jsonResponse = response?.data?.data;
    setDishes(jsonResponse);
  };

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
        {/* <Pressable onPress={() => {}}>
          <Text style={{}}>{tokens}</Text>
        </Pressable> */}
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
