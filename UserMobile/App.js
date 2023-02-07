import 'react-native-gesture-handler';
import '@azure/core-asynciterator-polyfill';
import {View, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Router from './Router/index';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import AuthContextProvider from './src/Context/AuthContext';
import SplashScreen from 'react-native-splash-screen';
import {LogBox} from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    // <NavigationContainer>
    <NavigationContainer>
      <GestureHandlerRootView style={{flex: 1}}>
        <AuthContextProvider>
          <Router />
          {/* <Text>JAY SHREE KRISHNA</Text> */}
        </AuthContextProvider>
      </GestureHandlerRootView>
    </NavigationContainer>

    // </NavigationContainer>
  );
};

export default App;
