import {View, Text} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {createStackNavigator} from '@react-navigation/stack';
import HistoryScreen from '../screens/HistoryScreen';
import ProfileScreen from '../screens/ProfileScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../screens/HomeScreen';
import BasketScreen from '../screens/BasketScreen';
import DishDetailScreen from '../screens/DishDetailScreen';
import Payment from '../screens/Payment';
import UpdateProfile from '../screens/UpdateProfile';
import FavouriteScreen from '../screens/FavouriteScreen';
import OtpScreen from '../screens/OtpScreen';
import StarterScreen from '../screens/StarterScreen';
import IceCreamScreen from '../screens/IceCreamScreen';
import MainCourseScreen from '../screens/MainCourseScreen';
import SearchScreen from '../screens/SearchScreen';
import HistoryDetailScreen from '../screens/HistoryDetailScreen';
import StripeScreen from '../screens/StripeScreen';
import {StripeProvider} from '@stripe/stripe-react-native';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const BottomTabNav = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarInactiveTintColor: '#f5c3bf',
        tabBarActiveTintColor: '#f7442d',
      }}>
      <Tab.Screen
        component={HomeStack}
        name="Home"
        options={{
          headerShown: false,
          tabBarLabelStyle: {marginTop: -6, marginBottom: 2},
          tabBarIcon: ({color}) => (
            <Entypo name="home" size={23} color={color} />
          ),
        }}
      />
      <Tab.Screen
        component={BasketStack}
        name="Basket"
        options={{
          headerShown: false,
          tabBarLabelStyle: {marginTop: -6, marginBottom: 2},
          tabBarIcon: ({color}) => (
            <Entypo name="shopping-cart" size={23} color={color} />
          ),
        }}
      />
      <Tab.Screen
        component={HistoryStack}
        name="History"
        options={{
          headerShown: false,
          tabBarLabelStyle: {marginTop: -6, marginBottom: 2},
          tabBarIcon: ({color}) => (
            <Ionicons name="fast-food" size={23} color={color} />
          ),
        }}
      />
      <Tab.Screen
        component={ProfileScreenStack}
        name="Profile"
        options={{
          headerShown: false,
          tabBarLabelStyle: {marginTop: -6, marginBottom: 2},
          tabBarIcon: ({color}) => (
            <FontAwesome5 name="user-alt" size={23} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNav;

const HistoryStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen component={HistoryScreen} name="HistoryScreen" />
      <Stack.Screen
        component={HistoryDetailScreen}
        name="HistoryDetailScreen"
      />
    </Stack.Navigator>
  );
};

const BasketStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen component={BasketScreen} name="BasketScreen" />
      <Stack.Screen component={Payment} name="Payment" />
      <Stack.Screen component={OtpScreen} name="OtpScreen" />
      <Stack.Screen component={StripeScreen} name="StripeScreen" />
    </Stack.Navigator>
  );
};
const ProfileScreenStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen component={ProfileScreen} name="ProfileScreen" />
      <Stack.Screen component={UpdateProfile} name="UpdateProfile" />
      <Stack.Screen component={FavouriteScreen} name="FavouriteScreen" />
    </Stack.Navigator>
  );
};

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen component={HomeScreen} name="HomeScreen" />
      <Stack.Screen component={DishDetailScreen} name="DishDetailScreen" />
      <Stack.Screen component={StarterScreen} name="StarterScreen" />
      <Stack.Screen component={IceCreamScreen} name="IceCreamScreen" />
      <Stack.Screen component={MainCourseScreen} name="MainCourseScreen" />
      <Stack.Screen component={SearchScreen} name="SearchScreen" />
    </Stack.Navigator>
  );
};
