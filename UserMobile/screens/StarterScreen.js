import {View, Text, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import ProductScreenComponent from '../components/ProductScreenComponent';

const StarterScreen = () => {
  const [starter, setStarter] = useState([]);
  let jsonValue;
  const getData = async () => {
    const value = await AsyncStorage.getItem('userDetail');
    jsonValue = JSON.parse(value);
  };

  useEffect(() => {
    getData();
    setTimeout(() => fetchDishess(), 510);
  }, []);

  const fetchDishess = async () => {
    const response = await axios.post(
      `http://10.0.2.2:6000/api/v1/canteen/dishes/category`,
      {},
      {headers: {Authorization: `Bearer ${jsonValue.token}`}},
    );
    const jsonResponse = await response?.data?.data;
    setStarter(jsonResponse.Starter);
  };

  return (
    <View>
      <View style={{padding: 10}}>
        <Text
          style={{fontFamily: 'Fredoka-Regular', color: 'black', fontSize: 17}}>
          Starter
        </Text>
      </View>
      <View
        style={{
          backgroundColor: 'grey',
          height: 1,
          marginHorizontal: 15,
        }}></View>
      <FlatList
        data={starter}
        renderItem={({item}) => <ProductScreenComponent dish={item} />}
        keyExtractor={item => item.imageUrl}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default StarterScreen;
