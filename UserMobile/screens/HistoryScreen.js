import {View, Text, Pressable, Image, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useAuthContext} from '../src/Context/AuthContext';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import HistoryScreenComponent from '../components/HistoryScreenComponent';
import axios from 'axios';

const HistoryScreen = () => {
  const [orders, setOrders] = useState([]);
  const {tokens, users} = useAuthContext();
  useEffect(() => {
    fetchDetail();
  }, []);

  const [fc, setFc] = useState([]);
  const fetchDetail = async () => {
    const response = await axios.get(
      `http://10.0.2.2:8000/api/v1/user/${users}/orders?status=COMPLETED`,
      {headers: {Authorization: `Bearer ${tokens}`}},
    );
    setOrders(response.data.data);
  };

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <View style={{marginTop: 15, marginBottom: 15}}>
        <Text
          style={{
            color: 'black',
            fontFamily: 'Fredoka-Regular',
            fontSize: 19,
            alignSelf: 'center',
            textAlign: 'center',
          }}>
          Your Order History
        </Text>
      </View>
      <FlatList
        data={orders}
        renderItem={({item}) => <HistoryScreenComponent favourite={item} />}
      />
    </View>
  );
};

export default HistoryScreen;
