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
// import {useNavigation} from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const index = () => {
  // const [user, setUser] = useState(false);
  const {user} = useAuthContext();

  //   const {setDbStudent, dbStudent} = useAuthContext();
  // const navigation = useNavigation();
  // const sub = user?.attributes.sub;

  // const getData = async () => {
  //   const value = await AsyncStorage.getItem('userDetail');
  //   if (value == null) {
  //     setUser(false);
  //     console.log(JSON.stringify(value));
  //   } else {
  //     setUser(true);
  //   }
  // };
  // useEffect(() => {
  //   getData();
  // }, []);
  //   const checkUser = async () => {
  //     try {
  //       const authUser = await Auth.currentAuthenticatedUser({bypassCache: true});
  //       setUser(authUser);
  //     } catch (e) {
  //       setUser(null);
  //     }
  //   };

  //   useEffect(() => {
  //     DataStore.query(Student, student => student.sub('eq', sub)).then(
  //       students => {
  //         setDbStudent(students[0]);
  //       },
  //     );
  //   }, [sub]);

  //   useEffect(() => {
  //     checkUser();
  //   }, []);

  //   useEffect(() => {
  //     const listener = data => {
  //       if (data.payload.event === 'signIn' || data.payload.event === 'signOut') {
  //         checkUser();
  //         // saveDbUser();
  //       }
  //     };

  //     Hub.listen('auth', listener);
  //     return () => Hub.remove('auth', listener);
  //   }, []);

  //   if (user === undefined) {
  //     return (
  //       <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
  //         <ActivityIndicator />
  //       </View>
  //     );
  //   }
  // if (dbStudent === undefined) {
  //   return (
  //     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
  //       <ActivityIndicator />
  //     </View>
  //   );
  // }

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
          {/* <Stack.Screen name="HomeScreen" component={HomeScreen} /> */}
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
