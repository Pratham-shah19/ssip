import {
  Text,
  View,
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
    const value = await AsyncStorage.getItem('userDetail');
    jsonValue = JSON.parse(value);
    setUsers(jsonValue.userID);
    setTokens(jsonValue.token);
  };
  useEffect(() => {
    getData();
    setTimeout(() => fetchDishes(), 100);
  }, []);

  const fetchDishes = async () => {
    console.log('token:', jsonValue.token);
    const response = await axios.get(
      `http://65.0.189.107:8000/api/v1/user/dishes/filter?sort=rating`,
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
          marginTop: 3,
        }}>
        <View style={{}}></View>
        <View style={{marginHorizontal: 3}}>
          <Text
            style={{
              fontSize: 16,
              marginLeft: 4,
              color: 'black',
              fontFamily: 'Fredoka-Medium',
            }}>
            Eat What Makes You Happy...
          </Text>
        </View>
      </View>
      <View>
        <View style={{height: 260, marginLeft: 13}}>
          <ScrollView
            horizontal
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}>
            <FlatList
              data={dishes}
              contentContainerStyle={{alignSelf: 'flex-start'}}
              numColumns={Math.ceil(5)}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              style={{marginTop: 10}}
              renderItem={({item}) => <FamousItemComponent food={item} />}
              keyExtractor={item => item.name}
            />
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default FamousItems;
