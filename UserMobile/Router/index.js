import React, {useEffect, useState} from 'react';
import {View, ActivityIndicator} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ConfirmEmailScreen from '../screens/ConfirmEmailScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import NewPasswordScreen from '../screens/NewPasswordScreen';
import HomeScreen from '../screens/HomeScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAuthContext} from '../src/Context/AuthContext';
import BottomTabNav from './BottomTabNav';
const Stack = createNativeStackNavigator();

const index = () => {
  const {user} = useAuthContext();

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {user ? (
        <>
          <Stack.Screen
            component={BottomTabNav}
            name="BottomTabBarNavigation"
            options={{headerShown: false}}
          />
        </>
      ) : (
        <>
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="ConfirmEmail" component={ConfirmEmailScreen} />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPasswordScreen}
          />
          <Stack.Screen
            name="NewPasswordScreen"
            component={NewPasswordScreen}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default index;
