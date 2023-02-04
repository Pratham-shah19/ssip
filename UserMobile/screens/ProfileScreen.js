import * as React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Pressable,
  View,
  Text,
  ScrollView,
} from 'react-native';
import {useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import {Auth} from 'aws-amplify';
import {useNavigation} from '@react-navigation/native';
import {useAuthContext} from '../src/Context/AuthContext';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoader from '../components/AppLoader';

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
  useEffect(() => {
    walletDetail();
  }, []);
  const logout = async () => {
    setLoginPending(true);
    await AsyncStorage.clear();
    // jsonValue = '';
    setItems([]);
    setTimeout(() => setTokens(null), 200);
    setTimeout(() => setUser(false), 500);
    // console.log('done');
    setLoginPending(false);
  };

  const walletDetail = async () => {
    const response = await axios.get(
      `http://65.0.189.107:8000/api/v1/user/${users}/wallet`,
      {headers: {Authorization: `Bearer ${tokens}`}},
    );
    // navigation.navigate('OtpScreen');
    // console.log(response.data.data);
    setWallet(response.data.data);
  };

  return (
    <>
      <ScrollView style={{backgroundColor: 'white'}}>
        <View style={styles.container}>
          <View
            style={{
              marginHorizontal: 10,
              marginTop: 40,
            }}>
            <View>
              <Text
                style={{
                  fontSize: 30,
                  fontFamily: 'Fredoka-Medium',
                  color: 'black',
                }}>
                {dbUser.name}
              </Text>
              <Text
                style={{
                  marginRight: 10,
                  fontSize: 16,
                  fontFamily: 'Fredoka-Regular',
                  color: 'grey',
                }}>
                {dbUser.address}
              </Text>
            </View>
          </View>
          <View style={{padding: 7}}>
            <Text
              style={{
                fontFamily: 'Fredoka-Regular',
                color: 'black',
                fontSize: 20,
              }}>
              Current Balance: {'\u20B9'}
              {wallet}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              marginBottom: 10,
              marginTop: 20,
              alignItems: 'center',
            }}>
            <View>
              <Pressable style={{flex: 1}}>
                <Ionicons
                  name="heart-outline"
                  size={25}
                  color="#f35858"
                  style={{alignSelf: 'center'}}
                />
                <Text style={styles.like}>Like</Text>
              </Pressable>
            </View>
            <View>
              <Pressable style={{flex: 1}}>
                <Ionicons
                  name="notifications-outline"
                  size={25}
                  color="#f35858"
                  style={{alignSelf: 'center'}}
                />
                <Text style={styles.like}>Notification</Text>
              </Pressable>
            </View>
            <View>
              <Pressable style={{flex: 1}}>
                <Ionicons
                  name="settings-outline"
                  size={25}
                  color="#f35858"
                  style={{alignSelf: 'center'}}
                />
                <Text style={styles.like}>Setting</Text>
              </Pressable>
            </View>
            <View>
              <Pressable style={{flex: 1}}>
                <Ionicons
                  name="wallet-outline"
                  size={25}
                  color="#f35858"
                  style={{alignSelf: 'center'}}
                />
                <Text style={styles.like}>Payments</Text>
              </Pressable>
            </View>
          </View>

          {/* <Ionicons name="star-outline" size={30} color="#8f58c7" /> */}

          {/* <Text style={styles.textcolour}>Your Rating</Text> */}

          <View style={{marginHorizontal: 18, marginTop: 10}}>
            <Text
              style={{
                fontFamily: 'Fredoka-Medium',
                fontSize: 19,
                marginBottom: 8,
                color: 'black',
              }}>
              Food orders
            </Text>
            <Pressable
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
              }}
              onPress={() => navigation.navigate('HistoryScreen')}>
              <Ionicons
                name="ios-fast-food-outline"
                size={25}
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
              onPress={() => navigation.navigate('FavouriteScreen')}>
              <MaterialIcons
                name="favorite-outline"
                size={25}
                color="#f35858"
              />
              <Text style={styles.textcolour}>Favorite Orders</Text>
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
                size={25}
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
              <MaterialIcons name="book-online" size={25} color="#f35858" />
              <Text style={styles.textcolour}>Online Ordering App</Text>
            </Pressable>
            <Pressable
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <Ionicons
                name="information-circle-outline"
                size={25}
                color="#f35858"
              />
              <Text style={styles.textcolour}>About</Text>
            </Pressable>
          </View>

          <View style={{marginHorizontal: 10, marginTop: 10}}>
            <Pressable>
              <Text style={styles.textcolour}>Give Feedback</Text>
            </Pressable>
            <Pressable>
              <Text style={styles.textcolour}>Rate Us On PlayStore</Text>
            </Pressable>
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
                  fontSize: 20,
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
    fontSize: 15,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  textcolour: {
    fontSize: 17,
    color: '#4d4d4d',
    marginBottom: 7,
    marginTop: 5,
    marginHorizontal: 10,
    fontFamily: 'Fredoka-Regular',
  },
  like: {
    alignSelf: 'center',
    fontSize: 15,
    color: 'black',
    fontFamily: 'Fredoka-Regular',
  },
  likr1: {
    alignSelf: 'center',
    fontSize: 22,
    color: 'black',
  },
});
