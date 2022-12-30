import {View, Text, Pressable, Image, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
// import {DataStore} from 'aws-amplify';
// import {Restaurant, Favourites} from '../src/models';
import {useAuthContext} from '../src/Context/AuthContext';
// import {S3Image} from 'aws-amplify-react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
// import FavouriteScreenComponent from '../components/FavouriteScreenComponents/FavouriteScreenComponent';
import HistoryScreenComponent from '../components/HistoryScreenComponent';
import axios from 'axios';

const HistoryScreen = () => {
  const [orders, setOrders] = useState([]);
  // const {users} = useAuthContext();
  const {tokens} = useAuthContext();
  useEffect(() => {
    fetchDetail();
  }, []);
  // const {id} = useAuthContext();
  const [fc, setFc] = useState([]);
  const fetchDetail = async () => {
    const response = await axios.get(
      `http://10.0.2.2:8000/api/v1/user/orders?status=COMPLETED`,
      {headers: {Authorization: `Bearer ${tokens}`}},
    );
    // console.log('history:', response.data);
    // const data = response.data.data;
    // eg();
    console.log(response.data.data);
    setOrders(response.data.data);
  };

  // const eg = () => {
  //   let str = '';
  //   const order = orders.items;
  //   order.forEach(order => {
  //     str += order.dishName.name + ',';
  //   });
  //   console.log(str);
  // };
  // useEffect(() => {
  //   if (!id) {
  //     return;
  //   }
  //   DataStore.query(Favourites, favourite => favourite.userID('eq', id)).then(
  //     setFc,
  //   );
  // }, []);
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
          Your History
        </Text>
      </View>
      {/* <FlatList
        data={orders}
        renderItem={({item}) => <HistoryScreenComponent favourite={item} />}
      /> */}
    </View>
  );
};

export default HistoryScreen;
