import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  Dimensions,
  Pressable,
} from 'react-native';
import React from 'react';
import TopBrands from '../components/HomeScreenComponents/TopBrands';
import {useAuthContext} from '../src/Context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FamousItems from '../components/HomeScreenComponents/FamousItems';
// import NearByRestaurants from '../components/HomeScreenComponents/NearByRestaurants';
// import NearByRestaurants from '../components/HomeScreenComponents/FoodDishes';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import ImageCarousel from '../components/HomeScreenComponents/ImageCarousel';
import Header from '../components/HomeScreenComponents/Header';
import FoodDishes from '../components/HomeScreenComponents/FoodDishes';

const HomeScreen = () => {
  const {user, setUser} = useAuthContext();
  return (
    <ScrollView
      style={{backgroundColor: 'white'}}
      showsVerticalScrollIndicator={false}>
      <Header />
      <View style={styles.filter}></View>

      <View>
        <ImageCarousel />
      </View>
      <View style={styles.famousItems}>
        <FamousItems />
      </View>
      <View style={styles.restaurantsNearby}>
        <FoodDishes />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  filter: {},
  mainfont: {
    fontWeight: 'bold',
  },
  banner: {
    height: '100%',
    width: '100%',
    borderRadius: 13,
  },
  freedeliveryPoster: {},
  topBrands: {},
  famousItems: {},
  topOffers: {},
  coupons: {},
  restaurantsNearby: {},
  container: {
    flex: 1,
  },
  bannerView: {
    height: 225,
    marginTop: 25,
    width: 335 % windowWidth,
    alignSelf: 'center',
    borderRadius: 17,
    margin: 15,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});

export default HomeScreen;
// import {View, Text, Pressable, ActivityIndicator} from 'react-native';
// import React, {useState, useEffect} from 'react';
// import {useAuthContext} from '../src/Context/AuthContext';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// const HomeScreen = () => {
//   // const {setUser, tokens, jsonValue} = useAuthContext();
//   const [users, setUsers] = useState(null);
//   const [tokens, setTokens] = useState(null);
//   let jsonValue;
//   const logout = async () => {
//     await AsyncStorage.removeItem('userDetail');
//     // setUser(false);
//     console.log('done');
//   };
//   const getData = async () => {
//     const value = await AsyncStorage.getItem('userDetail');
//     jsonValue = JSON.parse(value);
//     console.log('user in auth context:', jsonValue);
//     // setUser(true);
//     setUsers(jsonValue.userID);
//     setTokens(jsonValue.token);
//     // setDbUser(jsonValue);
//   };
//   useEffect(() => {
//     getData();
//     console.log('in homescreen');
//     setTimeout(() => console.log('hello'), 1000);
//     // console.log(jsonValue?.token);
//     setTimeout(() => console.log('after:', jsonValue.token), 1);
//     setTimeout(() => setTokens(jsonValue?.token), 1000);
//   }, []);

//   if (jsonValue?.token === null) {
//     return <ActivityIndicator size={25} color={'blue'} />;
//   }

//   return (
//     <View>
//       <Text>Jay Shree Krishna🙏</Text>
//       <Text style={{color: 'black'}}>{tokens}</Text>
//       <Pressable onPress={logout}>
//         <Text>logout</Text>
//       </Pressable>
//     </View>
//   );
// };

// export default HomeScreen;
