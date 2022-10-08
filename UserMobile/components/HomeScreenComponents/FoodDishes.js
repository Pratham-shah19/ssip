import {
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Text,
  Pressable,
} from 'react-native';
import React, {useState, useEffect} from 'react';
// import ProductScreenComponent from '../components/ProductScreenComponent';
import ProductScreenComponent from '../ProductScreenComponent';
// import HeaderComponent from '../components/ProductScreenComponent/HeaderComponent';
import Entypo from 'react-native-vector-icons/Entypo';
import {useRoute, useNavigation} from '@react-navigation/native';
// import {Restaurant, Dish} from '../src/models';
// import {useBasketContext} from '../src/Contexts/BasketContext';
import {useAuthContext} from '../../src/Context/AuthContext';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
// import AsyncStorage from '@react-native-community/async-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useRef} from 'react';

// import { AsyncStorage } from 'react-native';
// import { AsyncStorage } from 'react-native';
// import {useAuthContext} from '../../src/Context/AuthContext';

const FoodDishes = () => {
  const [restaurant, setRestaurant] = useState(null);
  const [dishes, setDishes] = useState([]);
  const [name, setName] = useState(null);
  const [rating, setRating] = useState(null);
  const [price, setPrice] = useState(null);
  const [category, setCategory] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [id, setId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [iceCream, setIceCream] = useState([]);
  const [starter, setStarter] = useState([]);
  const [mainCourse, setMainCourse] = useState([]);
  // const [dbUser, setDbUser] = useState();
  // const {dbUser} = useAuthContext();
  // const {tokens} = useAuthContext();
  const tokens =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzNiMmQ5MjAyOWNkODNlNzQyNGNjZDAiLCJuYW1lIjoiS2FuZGFycCIsImlhdCI6MTY2NTEwODAyNiwiZXhwIjoxNjY3NzAwMDI2fQ.ibs8d_jfKwh0UO1ZnCDxNIfm34un53OdDn8DtNXxqVo';

  // const {dbUser} = useAuthContext();
  // const token = dbUser?.token;
  // const getData = async () => {};
  // let ice;
  // let start;
  const route = useRoute();
  const navigation = useNavigation();
  const uploadBtn = useRef();
  useEffect(() => {
    fetchDishess();
  }, []);
  // const token = dbUser?.token;
  // useEffect(() => {
  //   // () => {
  //   //   let timer = setTimeout(() => setDishes(), 5000);
  //   //   return () => {
  //   //     clearTimeout(timer);
  //   //   };
  //   // };

  //   fetchDishes();
  //   // setDbUserState(dbUser);
  //   // let userDummmy = await AsyncStorage.getItem('userDetail');
  //   // console.log('User :', dbUser);
  //   // getData();
  //   // fetchDishes();

  //   // return () {};
  //   // fetchDishes();
  //   // return function () {};
  // }, []);

  // const fetchDishes = async () => {
  //   const response = await axios.get('http://10.0.2.2:8000/api/v1/user/dishes');
  //   const jsonResponse = JSON.stringify(response.data.data);
  //   // const jsonResponse = await response.json();
  //   // const res = await jsonResponse.data;
  //   setDishes(jsonResponse);
  //   console.log(dishes);
  //   console.log(jsonResponse);
  //   // setTimeout(() => {
  //   //   console.log(jsonResponse);
  //   //   console.log(dishes);
  //   // }, 2000);

  //   // console.log(jsonResponse.data.data);
  // };

  // const fetchDishes = () => {
  //   //   // const response = await axios.post(
  //   //   //   'http://10.0.2.2:6000/api/v1/canteen/dishes/category',
  //   //   //   {},
  //   //   //   {headers: {Authorization: `Bearer ${dbUser?.token}`}},
  //   //   // );
  //   //   // const jsonResponse = response.data;
  //   //   // const jason = JSON.stringify(jsonResponse);
  //   //   // console.log(jason);
  //   //   // setDishes(response);
  //   //   // setIceCream(jason.IceCream);
  //   //   // setStarter(jason.Starter);
  //   //   // setLoading(true);
  //   //   // console.log(dbUser?.token);
  //   fetch(`http://10.0.2.2:6000/api/v1/canteen/dishes/category`, {
  //     method: 'POST',
  //     headers: {
  //       //this what's exactly look in my postman
  //       Authorization: `Bearer ${dbUser?.token}`,
  //     },
  //   })
  //     .then(response => response.json())
  //     .then(responseJson => {
  //       const jasonData = responseJson;
  //       const data = jasonData.data;
  //       ice = data?.IceCream;
  //       start = data?.Starter;
  //       //       //     //     // if (dishes != data) {
  //       //       // setDishes(data);
  //       setIceCream(ice);
  //       setStarter(start);
  //       //       //     //     // }
  //       //       //     //     // console.log(dishes);
  //       //       //     //     // jasonData.data.forEach(item => {
  //       //       //     //     //   var name = item.name;
  //       //       //     //     //   var imageUrl = item.imageUrl;
  //       //       //     //     //   var rating = item.rating;
  //       //       //     //     //   var category = item.category;
  //       //       //     //     //   var price = item.price;
  //       //       //     //     //   var _id = item._id;
  //       //       //     //     //   // var  = item.region;
  //       //       //     //     //   setName(name);
  //       //       //     //     //   setImageUrl(imageUrl);
  //       //       //     //     //   setRating(rating);
  //       //       //     //     //   setCategory(category);
  //       //       //     //     //   setPrice(price);
  //       //       //     //     //   setId(_id);
  //       //       //     //     //   // console.log(name)
  //       //       //     //     //   // setRegion(region);
  //       //       //     //     // });
  //     });
  // };
  let number = 0;
  const fetchDishess = async () => {
    // const value = await AsyncStorage.getItem('userDetail');
    // const jsonValue = JSON.parse(value);
    // // setUser(true);
    // console.log(jsonValue);
    // setDbUser(jsonValue.token);
    // console.log(dbUser);
    // const {email, password} = data;
    // if (loading) {
    //   return;
    // }
    // const responsedata = await fetch('http://10.0.2.2:3000/api/v1/user/login', {
    //   method: 'POST',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({email: data.email, password: data.password}),
    // });
    // const response = await responsedata.json();
    // console.log(data);
    // console.log(id);
    // console.log(dbUser?.token);
    // if (dbUser.token) {
    // if (number === 0) {
    //   number++;
    //
    //
    const response = await axios.post(
      `http://10.0.2.2:6000/api/v1/canteen/dishes/category`,
      {},
      {headers: {Authorization: `Bearer ${tokens}`}},
    );
    console.log(response);
    const jsonResponse = await response?.data?.data;
    console.log(jsonResponse);
    setDishes(jsonResponse);
    setIceCream(jsonResponse.IceCream);
    setStarter(jsonResponse.Starter);
    setMainCourse(jsonResponse.MainCourse);
  };

  // let count = 0;
  // const fetchDishes = async () => {
  //   // const value = await AsyncStorage.getItem('userDetail');
  //   // const jsonValue = JSON.parse(value);
  //   // //  if (value != null) {
  //   // //    console.log('user in auth context:', jsonValue);
  //   // //  setUser(true);
  //   // setDbUser(jsonValue.token);
  //   // setLoading(true);
  //   // console.log(dbUser?.token);
  //   // if (dbUser) {
  //   // if (count === 0) {
  //   //   count++;
  //   fetch(`http://10.0.2.2:6000/api/v1/canteen/dishes/category`, {
  //     method: 'POST',
  //     headers: {
  //       //this what's exactly look in my postman
  //       Authorization: `Bearer ${token}`,
  //     },
  //   })
  //     .then(response => response.json())
  //     .then(responseJson => {
  //       // console.log(responseJson);
  //       var jasonData = responseJson;
  //       var data = jasonData.data;
  //       //     // var iceCream = data.IceCream;
  //       //     // if (dishes != data) {
  //       // var jsonValue = JSON.stringify(data);
  //       setDishes(data);
  //       setIceCream(jsonResponse.IceCream);
  //       setStarter(jsonResponse.Starter);
  //       setMainCourse(jsonResponse.MainCourse);
  //       //     // setIceCream(iceCream);
  //       //     // setStarter(data.Starter);
  //       //     // }
  //       //     console.log(dishes);
  //     });
  //   // }
  // };
  //
  //
  // }

  // const id = route.params?.id;

  // const {
  //   setRestaurant: setBasketRestaurant,
  //   basket,
  //   basketDishes,
  // } = useBasketContext();

  // useEffect(() => {
  //   if (!id) {
  //     return;
  //   }
  //   setBasketRestaurant(null);

  //   DataStore.query(Restaurant, id).then(setRestaurant);

  //   DataStore.query(Dish, dish => dish.restaurantID('eq', id)).then(setDishes);
  // }, [id]);

  // useEffect(() => {
  //   setBasketRestaurant(restaurant);
  // }, [restaurant]);

  // if (!restaurant) {
  //   return (
  //     <View
  //       style={{
  //         alignSelf: 'center',
  //         justifyContent: 'center',
  //         alignItems: 'center',
  //         alignContent: 'center',
  //         flex: 1,
  //       }}>
  //       <ActivityIndicator color={'violet'} size={'large'} />
  //     </View>
  //   );
  // }
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
          <MaterialIcons name="restaurant" size={18} color="black" />
        </View>
        <Text
          style={{
            fontSize: 18,
            fontFamily: 'Fredoka-Medium',
            marginLeft: 4,
            color: 'black',
          }}>
          All Delicious Dishes
        </Text>
        <Pressable onPress={() => {}}>
          <Text style={{color: 'white'}}>press</Text>
        </Pressable>
      </View>
      <View style={{padding: 10}}>
        <Text
          style={{fontFamily: 'Fredoka-Regular', color: 'black', fontSize: 17}}>
          Starter
        </Text>
      </View>
      <View
        style={{
          backgroundColor: 'grey',
          height: 1,
          marginHorizontal: 15,
        }}></View>
      <FlatList
        data={starter}
        renderItem={({item}) => (
          <ProductScreenComponent
            // imageUrl={imageUrl}
            // price={price}
            // name={name}
            // category={category}
            // rating={rating}
            // id={id}
            dish={item}
          />
        )}
        keyExtractor={item => item._id}
        showsVerticalScrollIndicator={false}
      />
      <View style={{padding: 10}}>
        <Text
          style={{fontFamily: 'Fredoka-Regular', color: 'black', fontSize: 17}}>
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
        renderItem={({item}) => (
          <ProductScreenComponent
            // imageUrl={imageUrl}
            // price={price}
            // name={name}
            // category={category}
            // rating={rating}
            // id={id}
            dish={item}
          />
        )}
        // keyExtractor={item => item.name}
        showsVerticalScrollIndicator={false}
      />
      <View style={{padding: 10}}>
        <Text
          style={{fontFamily: 'Fredoka-Regular', color: 'black', fontSize: 17}}>
          Main Course
        </Text>
      </View>
      <View
        style={{
          backgroundColor: 'grey',
          height: 1,
          marginHorizontal: 15,
        }}></View>
      <FlatList
        data={mainCourse}
        renderItem={({item}) => (
          <ProductScreenComponent
            // imageUrl={imageUrl}
            // price={price}
            // name={name}
            // category={category}
            // rating={rating}
            // id={id}
            dish={item}
          />
        )}
        // keyExtractor={item => item.name}
        showsVerticalScrollIndicator={false}
      />
      {/* <TouchableOpacity
        style={{
          position: 'absolute',
          top: 7,
          left: 10,
          width: 35,
          height: 35,
          backgroundColor: 'white',
          borderRadius: 20,
          alignItems: 'center',
          alignContent: 'center',
          justifyContent: 'center',
        }}
        onPress={() => navigation.goBack()}>
        <Entypo name="chevron-left" size={28} color={'black'} />
      </TouchableOpacity> */}
      {/* {basket && (
        <TouchableOpacity
          style={{
            marginHorizontal: 10,
            backgroundColor: '#f35858',
            borderRadius: 5,
            position: 'absolute',
            top: 629,
            padding: 10,
            paddingHorizontal: 28,
            alignItems: 'center',
          }}
          onPress={() => navigation.navigate('BasketScreen')}>
          <Text
            style={{
              color: 'white',
              fontWeight: '500',
              fontSize: 17,
              fontFamily: 'Fredoka-Regular',
              marginHorizontal: 80,
            }}>
            Open Basket ({basketDishes.length})
          </Text>
        </TouchableOpacity> */}
      {/* )} */}
    </View>
  );
};

export default FoodDishes;
