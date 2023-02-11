import {
  View,
  Text,
  Pressable,
  Image,
  FlatList,
  RefreshControl,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import {useAuthContext} from '../src/Context/AuthContext';
import Octicons from 'react-native-vector-icons/Octicons';
import {useNavigation} from '@react-navigation/native';
import HistoryScreenComponent from '../components/HistoryScreenComponent';
import axios from 'axios';
import HistoryLoader from '../components/HistoryLoader';

const HistoryScreen = () => {
  const [orders, setOrders] = useState([]);
  const {tokens, users} = useAuthContext();
  const [loadingPending, setLoadingPending] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [show, setShow] = useState(false);
  const [newOrder, setNewOrder] = useState([]);
  useEffect(() => {
    fetchDetail();
    fetchDetailNew();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchDetail();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  // if (newOrder != null) {
  //   setShow(true);
  // }

  const [fc, setFc] = useState([]);
  const fetchDetail = async () => {
    setLoadingPending(true);
    const response = await axios.get(
      `http://65.0.189.107:8000/api/v1/user/${users}/orders?status=COMPLETED`,
      {headers: {Authorization: `Bearer ${tokens}`}},
    );
    setOrders(response.data.data);
    setLoadingPending(false);
  };
  const fetchDetailNew = async () => {
    setLoadingPending(true);
    const response = await axios.get(
      `http://65.0.189.107:8000/api/v1/user/${users}/orders?status=NEW`,
      {headers: {Authorization: `Bearer ${tokens}`}},
    );
    setNewOrder(response.data.data);
    setLoadingPending(false);
  };

  return (
    <>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={{backgroundColor: 'white', flex: 1}}>
        <View
          style={{
            marginTop: 15,
            marginBottom: 15,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Octicons
            name="history"
            size={17}
            color={'#000000'}
            style={{marginRight: 4}}
          />
          <Text
            style={{
              marginLeft: 5,
              color: 'black',
              fontFamily: 'Fredoka-Regular',
              fontSize: 17,
              alignSelf: 'center',
              textAlign: 'center',
            }}>
            Your Order History
          </Text>
        </View>
        {/* <View style={{opacity: newOrder ? 0 : 1}}> */}
        {newOrder && (
          <View style={{}}>
            <Text
              style={{
                marginLeft: 13,
                color: '#735dde',
                fontSize: 15,
                fontFamily: 'Fredoka-Medium',
                opacity: newOrder ? 1 : 0,
              }}>
              Your Current Orders:
            </Text>
            <FlatList
              data={newOrder}
              renderItem={({item}) => (
                <HistoryScreenComponent favourite={item} />
              )}
            />
          </View>
        )}
        <View>
          <Text
            style={{
              marginLeft: 13,
              color: '#735dde',
              fontSize: 15,
              fontFamily: 'Fredoka-Medium',
              marginTop: 7,
            }}>
            Your Previous Orders:
          </Text>
          <FlatList
            data={orders}
            renderItem={({item}) => <HistoryScreenComponent favourite={item} />}
          />
        </View>
      </ScrollView>
      {loadingPending ? <HistoryLoader /> : null}
    </>
  );
};

export default HistoryScreen;
