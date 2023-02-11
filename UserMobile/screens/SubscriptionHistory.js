import {View, Text, FlatList, RefreshControl, ScrollView} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import axios from 'axios';
import {useAuthContext} from '../src/Context/AuthContext';
import SubscriptionHistoryComponent from '../components/SubscriptionHistoryComponent';
import SubscriptionHistoryDetail from './SubscriptionHistoryDetail';

const SubscriptionHistory = () => {
  const {users, tokens} = useAuthContext();
  const [historyData, setHistoryData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    history();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    history();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  const history = async () => {
    const response = await axios.get(
      `http://65.0.189.107:8000/api/v1/user/${users}/activesubscriptions`,
      {headers: {Authorization: `Bearer ${tokens}`}},
    );
    setHistoryData(response.data.data);
    // console.log(response.data.data);
  };
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      style={{backgroundColor: 'white', paddingTop: 10}}>
      <Text
        style={{
          color: 'black',
          fontFamily: 'Fredoka-Regular',
          alignSelf: 'center',
          marginVertical: 10,
          fontSize: 18,
        }}>
        Subscription History:
      </Text>
      <FlatList
        data={historyData}
        renderItem={({item}) => <SubscriptionHistoryDetail dish={item} />}
        keyExtractor={item => item._id}
        showsVerticalScrollIndicator={false}
      />
    </ScrollView>
  );
};

export default SubscriptionHistory;
