import {View, Text, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
// import ProductScreenComponent from '../ProductScreenComponent';
import ProductScreenComponent from '../components/ProductScreenComponent';
import AppLoader from '../components/AppLoader';

const IceCreamScreen = () => {
  const [iceCream, setIceCream] = useState([]);
  const [loadingPending, setLoadingPending] = useState(false);
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
    setLoadingPending(true);
    const response = await axios.post(
      `http://3.216.172.228:6500/api/v1/canteen/dishes/category`,
      {},
      {headers: {Authorization: `Bearer ${jsonValue.token}`}},
    );
    const jsonResponse = await response?.data?.data;
    setIceCream(jsonResponse.IceCream);
    setLoadingPending(false);
  };

  return (
    <>
      <View>
        <View style={{padding: 10}}>
          <Text
            style={{
              fontFamily: 'Fredoka-Regular',
              color: 'black',
              fontSize: 17,
            }}>
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
          keyExtractor={item => item._id}
          showsVerticalScrollIndicator={false}
        />
      </View>
      {loadingPending ? <AppLoader /> : null}
    </>
  );
};

export default IceCreamScreen;
