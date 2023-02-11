import * as React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Pressable,
  View,
  Text,
  ScrollView,
  RefreshControl,
  Linking,
} from 'react-native';
import {useEffect, useState, useCallback} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {useAuthContext} from '../src/Context/AuthContext';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoader from '../components/AppLoader';
import Foundation from 'react-native-vector-icons/Foundation';

export default function ProfileScreen() {
  const {dbUser} = useAuthContext();
  const navigation = useNavigation();
  const {
    setUser,
    users,
    tokens,
    jsonValue,
    setTokens,
    setItems,
    loginPending,
    setLoginPending,
  } = useAuthContext();
  const [wallet, setWallet] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [name, setName] = useState(null);
  const [address, setAddress] = useState(null);
  useEffect(() => {
    walletDetail();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    walletDetail();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const logout = async () => {
    setLoginPending(true);
    await AsyncStorage.clear();
    setItems([]);
    setTimeout(() => setTokens(null), 200);
    setTimeout(() => setUser(false), 500);
    setLoginPending(false);
  };

  // const walletDetail = async () => {
  //   const response = await axios.get(
  //     `http://65.0.189.107:8000/api/v1/user/${users}/wallet`,
  //     {headers: {Authorization: `Bearer ${tokens}`}},
  //   );
  //   setWallet(response.data.data);
  // };
  const walletDetail = async () => {
    const response = await axios.get(
      `http://65.0.189.107:8000/api/v1/user/${users}`,
      {headers: {Authorization: `Bearer ${tokens}`}},
    );
    setWallet(response.data.data.wallet);
    setAddress(response.data.data.address);
    setName(response.data.data.name);
  };
  return (
    <>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={{backgroundColor: 'white'}}>
        <View style={styles.container}>
          <View
            style={{
              marginHorizontal: 10,
              marginTop: 40,
            }}>
            <View>
              <Text
                style={{
                  fontSize: 25,
                  fontFamily: 'Fredoka-Medium',
                  color: 'black',
                }}>
                {name}
              </Text>
              <Text
                style={{
                  marginRight: 10,
                  fontSize: 14,
                  fontFamily: 'Fredoka-Regular',
                  color: 'grey',
                }}>
                {address}
              </Text>
            </View>
          </View>
          <View style={{padding: 7, marginTop: 10}}>
            <Text
              style={{
                fontFamily: 'Fredoka-Regular',
                color: 'black',
                fontSize: 16,
              }}>
              Current Balance: {'\u20B9'}
              {wallet}
            </Text>
          </View>

          <View style={{marginHorizontal: 18, marginTop: 5}}>
            <Text
              style={{
                fontFamily: 'Fredoka-Medium',
                fontSize: 17,
                marginBottom: 5,
                color: 'black',
              }}>
              Food orders
            </Text>
            <Pressable
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <Ionicons
                name="notifications-outline"
                size={21}
                color="#f35858"
                style={{}}
              />
              <Text style={styles.textcolour}>Notification</Text>
            </Pressable>
            <Pressable
              onPress={() => navigation.navigate('HistoryScreen')}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <Ionicons
                name="wallet-outline"
                size={21}
                color="#f35858"
                style={{}}
              />
              <Text style={styles.textcolour}>Payments</Text>
            </Pressable>
            <Pressable
              onPress={() => navigation.navigate('SubscriptionHistory')}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <Foundation
                name="dollar-bill"
                size={23}
                color="#f35858"
                style={{}}
              />
              <Text style={styles.textcolour}>Subscription History</Text>
            </Pressable>
            <Pressable
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
              }}
              onPress={() => navigation.navigate('HistoryScreen')}>
              <Ionicons
                name="ios-fast-food-outline"
                size={21}
                color="#f35858"
              />
              <Text style={styles.textcolour}>Your Orders</Text>
            </Pressable>
            <Pressable
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
              }}
              onPress={() => navigation.navigate('UpdateProfile')}>
              <MaterialCommunityIcons
                name="home-city-outline"
                size={21}
                color="#f35858"
              />
              <Text style={styles.textcolour}>Update Profile</Text>
            </Pressable>
            <Pressable
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <MaterialIcons name="book-online" size={21} color="#f35858" />
              <Text
                style={styles.textcolour}
                onPress={() =>
                  Linking.openURL(
                    'https://play.google.com/store/apps/details?id=com.ssip.governmentsachivalay',
                  )
                }>
                Online Ordering App
              </Text>
            </Pressable>
            <Pressable
              onPress={() => navigation.navigate('AboutUsScreen')}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <Ionicons
                name="information-circle-outline"
                size={21}
                color="#f35858"
              />
              <Text style={styles.textcolour}>About</Text>
            </Pressable>
          </View>

          <View style={{marginHorizontal: 10, marginTop: 10}}>
            <Text
              style={styles.textcolour}
              onPress={() =>
                Linking.openURL(
                  'https://play.google.com/store/apps/details?id=com.ssip.governmentsachivalay',
                )
              }>
              Give Feedback
            </Text>
            <Text
              style={styles.textcolour}
              onPress={() =>
                Linking.openURL(
                  'https://play.google.com/store/apps/details?id=com.ssip.governmentsachivalay',
                )
              }>
              Rate Us On PlayStore
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: 'black',
                borderRadius: 5,
                marginTop: 20,
                padding: 10,
                paddingHorizontal: 28,
                alignItems: 'center',
              }}
              onPress={logout}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: '500',
                  fontSize: 17,
                  fontFamily: 'Fredoka-Medium',
                }}>
                Logout
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      {loginPending ? <AppLoader /> : null}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 5,
  },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  textcolour: {
    fontSize: 15,
    color: '#4d4d4d',
    marginBottom: 7,
    marginTop: 5,
    marginHorizontal: 10,
    fontFamily: 'Fredoka-Regular',
  },
  like: {
    alignSelf: 'center',
    fontSize: 13,
    color: 'black',
    fontFamily: 'Fredoka-Regular',
  },
  likr1: {
    alignSelf: 'center',
    fontSize: 22,
    color: 'black',
  },
});
