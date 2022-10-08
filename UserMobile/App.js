import 'react-native-gesture-handler';
import '@azure/core-asynciterator-polyfill';
import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Router from './Router/index';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import AuthContextProvider from './src/Context/AuthContext';

const App = () => {
  return (
    // <NavigationContainer>
    <NavigationContainer>
      <GestureHandlerRootView style={{flex: 1}}>
        <AuthContextProvider>
          <Router />
        </AuthContextProvider>
      </GestureHandlerRootView>
    </NavigationContainer>

    // </NavigationContainer>
  );
};

export default App;
