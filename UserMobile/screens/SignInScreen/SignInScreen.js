// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   Image,
//   StyleSheet,
//   useWindowDimensions,
//   ScrollView,
//   Pressable,
//   Alert,
// } from 'react-native';
// import CustomInput from '../../components/CustomInput';
// import CustomButton from '../../components/CustomButton';
// import {useNavigation} from '@react-navigation/native';
// import {useForm} from 'react-hook-form';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {useAuthContext} from '../../src/Context/AuthContext';
// import AppLoader from '../../components/AppLoader';

// const SignInScreen = () => {
//   const {height} = useWindowDimensions();
//   const {
//     user,
//     setUser,
//     setTokens,
//     tokens,
//     getData,
//     loginPending,
//     setLoginPending,
//     setName,
//     setUserId,
//   } = useAuthContext();
//   const navigation = useNavigation();
//   const [loading, setLoading] = useState(false);

//   const {
//     control,
//     handleSubmit,
//     formState: {errors},
//   } = useForm();

//   const onSignInPressed = async data => {
//     // console.log(data);
//     try {
//       setLoginPending(true);
//       const response = await axios.post(
//         'http://3.109.165.137:3000/api/v1/user/login',
//         data,
//       );
//       console.log(response);
//       const obj = {
//         token: response.data.token,
//         userID: response.data.user.id,
//         name: response.data.user.name,
//       };
//       const jsonValue = JSON.stringify(obj);
//       await AsyncStorage.setItem('userDetail', jsonValue);
//       setTokens(response.data.token);
//       setName(response.data.user.name);
//       setUserId(response.data.user.id);
//       // console.log('b', response.data.token);
//       await getData();
//       setTimeout(() => console.log('a', tokens), 1000);
//       setLoginPending(false);
//     } catch (err) {
//       Alert.alert('Your email or password.');
//       navigation.navigate('SignIn');
//       setLoginPending(false);
//     }
//   };

//   const onForgotPasswordPressed = () => {
//     navigation.navigate('ForgotPassword');
//   };

//   const onSignUpPress = () => {
//     navigation.navigate('SignUp');
//   };

//   return (
//     <>
//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         style={{backgroundColor: 'white', padding: 20}}>
//         <View style={{alignItems: 'center'}}>
//           <Image
//             source={require('../../data/logo.png')}
//             style={{height: 260, width: 260, borderRadius: 20, marginTop: 30}}
//           />
//           <View
//             style={{
//               alignItems: 'center',
//               justifyContent: 'center',
//               alignContent: 'center',
//               marginVertical: 10,
//               marginBottom: 15,
//             }}>
//             <Text
//               style={{
//                 fontSize: 18,
//                 fontFamily: 'Fredoka-Medium',
//                 color: 'black',
//               }}>
//               Sign In
//             </Text>
//           </View>
//         </View>
//         <CustomInput
//           name="email"
//           placeholder="Email"
//           control={control}
//           rules={{required: 'Email is required'}}
//         />
//         <CustomInput
//           name="password"
//           placeholder="Password"
//           secureTextEntry
//           control={control}
//           rules={{
//             required: 'Password is required',
//             minLength: {
//               value: 3,
//               message: 'Password should be minimum 3 characters long',
//             },
//           }}
//         />

//         <CustomButton
//           text={loading ? 'Loading...' : 'Sign In'}
//           onPress={handleSubmit(onSignInPressed)}
//         />
//         <Pressable
//           onPress={onForgotPasswordPressed}
//           style={{alignContent: 'center', alignSelf: 'center', marginTop: 20}}>
//           <Text style={{color: '#735dde', fontFamily: 'Fredoka-Medium'}}>
//             Forgot Password?
//           </Text>
//         </Pressable>

//         {/* <SocialSignInButtons /> */}

//         {/* <CustomButton
//           text="Don't have an account? Create one"
//           onPress={onSignUpPress}
//           type="TERTIARY"
//         /> */}
//         <Pressable
//           onPress={onSignUpPress}
//           style={{alignContent: 'center', alignSelf: 'center', marginTop: 20}}>
//           <Text style={{color: 'black', fontFamily: 'Fredoka-Regular'}}>
//             Don't have an account? Create one
//           </Text>
//         </Pressable>
//       </ScrollView>
//       {loginPending ? <AppLoader /> : null}
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   root: {
//     alignItems: 'center',
//     padding: 20,
//   },
//   logo: {
//     width: '70%',
//     maxWidth: 300,
//     maxHeight: 200,
//     marginBottom: 20,
//   },
// });

// export default SignInScreen;
import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  Alert,
  Pressable,
  TextInput,
} from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAuthContext} from '../../src/Context/AuthContext';
import AppLoader from '../../components/AppLoader';

const SignInScreen = () => {
  const {height} = useWindowDimensions();
  const {
    user,
    setUser,
    setTokens,
    tokens,
    getData,
    loginPending,
    setLoginPending,
    setName,
    setUserId,
  } = useAuthContext();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [changeText, setChangeText] = useState('');
  const [password, setPassword] = useState('');

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const onSignInPressed = async data => {
    try {
      setLoginPending(true);
      const response = await axios.post(
        'http://3.109.165.137:3000/api/v1/user/login',
        {email: changeText, password: password},
      );

      const obj = {
        token: response.data.token,
        userID: response.data.user.id,
        name: response.data.user.name,
      };
      const jsonValue = JSON.stringify(obj);
      await AsyncStorage.setItem('userDetail', jsonValue);
      setTokens(response.data.token);
      setName(response.data.user.name);
      setUserId(response.data.user.id);
      await getData();
      setTimeout(() => console.log('a', tokens), 1000);
      setLoginPending(false);
    } catch (err) {
      Alert.alert('Email or password is wrong');
      setLoginPending(false);
    }
  };

  const onForgotPasswordPressed = () => {
    navigation.navigate('ForgotPassword');
  };

  const onSignUpPress = () => {
    navigation.navigate('SignUp');
  };

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{backgroundColor: 'white', padding: 20}}>
        <View style={{alignItems: 'center'}}>
          <Image
            source={require('../../data/logo.png')}
            style={{height: 200, width: 200, borderRadius: 20, marginTop: 30}}
          />
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              alignContent: 'center',
              marginVertical: 10,
              marginBottom: 15,
            }}>
            <Text
              style={{
                fontSize: 24,
                fontFamily: 'Fredoka-Medium',
                color: 'black',
              }}>
              Sign In
            </Text>
          </View>
        </View>
        <Text
          style={{
            color: 'black',
            fontSize: 14,
            fontFamily: 'Fredoka-Regular',
          }}>
          Email:
        </Text>
        <TextInput
          onChangeText={setChangeText}
          value={changeText}
          style={{
            height: 36,
            borderWidth: 0.5,
            borderColor: '#d1cfcf',
            marginTop: 5,
            borderRadius: 8,
            paddingHorizontal: 10,
            fontSize: 13,
            fontFamily: 'Fredoka-Regular',
            color: 'black',
          }}
        />
        {/* <CustomInput
          name="email"
          placeholder="Email"
          control={control}
          rules={{required: 'Email is required'}}
        /> */}
        <Text
          style={{
            color: 'black',
            fontSize: 14,
            fontFamily: 'Fredoka-Regular',
            marginTop: 10,
          }}>
          Password:
        </Text>
        {/* <CustomInput
          name="password"
          placeholder="Password"
          secureTextEntry
          control={control}
          rules={{
            required: 'Password is required',
            minLength: {
              value: 3,
              message: 'Password should be minimum 3 characters long',
            },
          }}
        /> */}
        <TextInput
          onChangeText={password}
          value={setPassword}
          style={{
            height: 36,
            borderWidth: 0.5,
            borderColor: '#d1cfcf',
            marginVertical: 7,
            borderRadius: 8,
            paddingHorizontal: 10,
            fontSize: 13,
            fontFamily: 'Fredoka-Regular',
            color: 'black',
          }}
        />
        {/* <CustomButton
          text={loading ? 'Loading...' : 'Sign In'}
          onPress={onSignInPressed}
        /> */}
        <Pressable
          onPress={onSignInPressed}
          style={{
            alignContent: 'center',
            alignSelf: 'center',
            marginTop: 20,
            backgroundColor: '#f35858',
            paddingVertical: 12,
            borderRadius: 9,
          }}>
          <Text
            style={{
              color: 'white',
              fontFamily: 'Fredoka-Medium',
              paddingHorizontal: 127,
              fontSize: 15,
            }}>
            Sign In
          </Text>
        </Pressable>
        {/* <CustomButton
          text="Forgot password?"
          onPress={onForgotPasswordPressed}
          type="TERTIARY"
        /> */}
        <Pressable
          onPress={onForgotPasswordPressed}
          style={{alignContent: 'center', alignSelf: 'center', marginTop: 20}}>
          <Text style={{color: '#735dde', fontFamily: 'Fredoka-Medium'}}>
            Forgot Password?
          </Text>
        </Pressable>
        {/* <SocialSignInButtons /> */}
        {/* <CustomButton
          text="Don't have an account? Create one"
          onPress={onSignUpPress}
          type="TERTIARY"
        /> */}
        <Pressable
          onPress={onSignUpPress}
          style={{alignContent: 'center', alignSelf: 'center', marginTop: 20}}>
          <Text style={{color: 'black', fontFamily: 'Fredoka-Regular'}}>
            Don't have an account? Create one
          </Text>
        </Pressable>
      </ScrollView>
      {loginPending ? <AppLoader /> : null}
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: '70%',
    maxWidth: 300,
    maxHeight: 200,
    marginBottom: 20,
  },
});

export default SignInScreen;
