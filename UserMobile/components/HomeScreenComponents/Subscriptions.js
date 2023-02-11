import {
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Text,
  Image,
  Pressable,
} from 'react-native';
import React, {useState, useEffect} from 'react';
// import ProductScreenComponent from '../components/ProductScreenComponent';
// import ProductScreenComponent from '../ProductScreenComponent';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useRoute, useNavigation} from '@react-navigation/native';
// import {useAuthContext} from '../../src/Context/AuthContext';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ProductScreenComponent from '../ProductScreenComponent';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useRef} from 'react';
import {useAuthContext} from '../../src/Context/AuthContext';
import SubscriptionProductitems from '../SubsciptionProductitems';

const Subscriptions = () => {
  const navigation = useNavigation();
  const {tokens} = useAuthContext();
  const [subscription, setSubscription] = useState([]);
  let jsonValue;
  const getData = async () => {
    const value = await AsyncStorage.getItem('userDetail');
    jsonValue = JSON.parse(value);
    // setUsers(jsonValue.userID);
    // setTokens(jsonValue.token);
  };
  useEffect(() => {
    getData();
    setTimeout(() => fetchSubscription(), 500);
  }, []);
  const fetchSubscription = async data => {
    const response = await axios.get(
      `http://65.0.189.107:8000/api/v1/user/subscriptions`,
      {headers: {Authorization: `Bearer ${jsonValue.token}`}},
    );
    const jsonResponse = response.data.data;
    // setDish(jsonResponse);
    setSubscription(jsonResponse);
    // console.log(jsonResponse);
  };

  return (
    <View>
      <View style={{flexDirection: 'row', alignItems: 'center', padding: 13}}>
        <View
          style={{
            borderRadius: 15,
            borderColor: '#f35858',
            borderWidth: 2,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 3,
          }}>
          <Ionicons name="ios-fast-food" size={16} color="black" />
        </View>
        <Text
          style={{
            fontSize: 16,
            fontFamily: 'Fredoka-Medium',
            marginLeft: 5,
            color: 'black',
          }}>
          All Subscriptions...
        </Text>
      </View>
      <FlatList
        style={{marginBottom: 30, marginTop: 5}}
        data={subscription}
        renderItem={({item}) => <SubscriptionProductitems dish={item} />}
        keyExtractor={item => item.imageUrl}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Subscriptions;
