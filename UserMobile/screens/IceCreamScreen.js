import {
  View,
  Text,
  FlatList,
  ScrollView,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import ProductScreenComponent from '../components/ProductScreenComponent';
import AppLoader from '../components/AppLoader';

const IceCreamScreen = () => {
  const [iceCream, setIceCream] = useState([]);
  const [loadingPending, setLoadingPending] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  let jsonValue;
  const getData = async () => {
    const value = await AsyncStorage.getItem('userDetail');
    jsonValue = JSON.parse(value);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchDishess();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

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
    setIceCream(jsonResponse['Beverages/Dessert']);
    setLoadingPending(false);
  };

  return (
    <>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={{backgroundColor: 'white'}}>
        <View style={{padding: 10}}>
          <Text
            style={{
              fontFamily: 'Fredoka-Regular',
              color: 'black',
              fontSize: 17,
            }}>
            Dessert
          </Text>
        </View>
        <View
          style={{
            backgroundColor: 'grey',
            height: 1,
            marginHorizontal: 15,
          }}></View>
        <FlatList
          style={{marginBottom: 30, marginTop: 5}}
          data={iceCream}
          renderItem={({item}) => <ProductScreenComponent dish={item} />}
          keyExtractor={item => item._id}
          showsVerticalScrollIndicator={false}
        />
      </ScrollView>
      {loadingPending ? <AppLoader /> : null}
    </>
  );
};
const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  // },
  scrollView: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default IceCreamScreen;
