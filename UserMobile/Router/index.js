import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ConfirmEmailScreen from '../screens/ConfirmEmailScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import NewPasswordScreen from '../screens/NewPasswordScreen';
import {useAuthContext} from '../src/Context/AuthContext';
import BottomTabNav from './BottomTabNav';
const Stack = createNativeStackNavigator();

const index = () => {
  const {user} = useAuthContext();
  return user ? <StackNavigator1 /> : <StackNavigator2 />;
};

const StackNavigator1 = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        component={BottomTabNav}
        name="BottomTabBarNavigation"
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const StackNavigator2 = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="ConfirmEmail" component={ConfirmEmailScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="NewPasswordScreen" component={NewPasswordScreen} />
    </Stack.Navigator>
  );
};

export default index;
