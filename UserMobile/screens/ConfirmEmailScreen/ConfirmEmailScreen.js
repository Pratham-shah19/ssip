// import React, {useState} from 'react';
// import {View, Text, StyleSheet, ScrollView, Alert} from 'react-native';
// import CustomInput from '../../components/CustomInput';
// import CustomButton from '../../components/CustomButton';
// import SocialSignInButtons from '../../components/SocialSignInButtons';
// import {useNavigation} from '@react-navigation/core';
// import {useForm} from 'react-hook-form';
// import {useRoute} from '@react-navigation/native';
// import axios from 'axios';
// // import {Auth} from 'aws-amplify';

// const ConfirmEmailScreen = () => {
//   const route = useRoute();
//   const {control, handleSubmit, watch} = useForm({
//     defaultValues: {username: route?.params?.username},
//   });
//   const email = route?.params.email;
//   // const username = watch('username');

//   const navigation = useNavigation();

//   const onConfirmPressed = async data => {
//     try {
//       // await Auth.confirmSignUp(data.username, data.code);
//       const response = await axios.post(
//         `http://13.233.214.112:8000/api/v1/user/${email}/validateOTP`,
//         data,
//       );
//       navigation.navigate('NewPasswordScreen', {email});
//     } catch (e) {
//       Alert.alert('Oops', e.message);
//     }
//   };

//   const onSignInPress = () => {
//     navigation.navigate('SignIn');
//   };

//   // const onResendPress = async () => {
//   //   try {
//   //     await Auth.resendSignUp(username);
//   //     Alert.alert('Success', 'Code was resent to your email');
//   //   } catch (e) {
//   //     Alert.alert('Oops', e.message);
//   //   }
//   // };

//   return (
//     <ScrollView showsVerticalScrollIndicator={false}>
//       <View style={styles.root}>
//         <Text style={styles.title}>Confirm your email</Text>

//         {/* <CustomInput
//           name="username"
//           control={control}
//           placeholder="Username"
//           rules={{
//             required: 'Username code is required',
//           }}
//         /> */}

//         <CustomInput
//           name="otp"
//           control={control}
//           placeholder="Enter your confirmation code"
//           rules={{
//             required: 'Confirmation code is required',
//           }}
//         />

//         <CustomButton text="Confirm" onPress={handleSubmit(onConfirmPressed)} />

//         {/* <CustomButton
//           text="Resend code"
//           onPress={onResendPress}
//           type="SECONDARY"
//         /> */}

//         <CustomButton
//           text="Back to Sign in"
//           onPress={onSignInPress}
//           type="TERTIARY"
//         />
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   root: {
//     alignItems: 'center',
//     padding: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#051C60',
//     margin: 10,
//   },
//   text: {
//     color: 'gray',
//     marginVertical: 10,
//   },
//   link: {
//     color: '#FDB075',
//   },
// });

// export default ConfirmEmailScreen;
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
  TextInput,
  Pressable,
} from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import SocialSignInButtons from '../../components/SocialSignInButtons';
import {useNavigation} from '@react-navigation/core';
import {useForm} from 'react-hook-form';
import {useRoute} from '@react-navigation/native';
import axios from 'axios';
import AppLoader from '../../components/AppLoader';
// import {Auth} from 'aws-amplify';

const ConfirmEmailScreen = () => {
  const route = useRoute();
  const {control, handleSubmit, watch} = useForm({
    defaultValues: {username: route?.params?.username},
  });
  const email = route?.params.email;
  const username = watch('username');
  const [check, setCheck] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState('');

  const navigation = useNavigation();

  const onConfirmPressed = async data => {
    try {
      // await Auth.confirmSignUp(data.username, data.code);
      console.log('email', email);
      setLoading(true);
      const response = await axios.post(
        `http://65.0.189.107:8000/api/v1/user/${email}/validateOtp`,
        {otp: otp},
      );
      console.log(response);
      navigation.navigate('NewPasswordScreen', {email});
      setLoading(false);
    } catch (e) {
      // Alert.alert();
      setCheck(true);
      setLoading(false);
    }
  };

  const onSignInPress = () => {
    navigation.navigate('SignIn');
  };

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{backgroundColor: 'white'}}>
        <View style={styles.root}>
          <Image
            source={require('../../data/email1.jpg')}
            style={{
              height: 230,
              width: 230,
              borderRadius: 20,
              marginTop: 30,
              alignSelf: 'center',
            }}
          />
          <Text style={styles.title}>Confirm your email</Text>

          {/* <CustomInput
            name="otp"
            control={control}
            placeholder="Enter your confirmation code"
            rules={{
              required: 'Confirmation code is required',
            }}
          /> */}
          <Text
            style={{
              color: 'black',
              fontSize: 14,
              fontFamily: 'Fredoka-Regular',
            }}>
            OTP:
          </Text>
          <TextInput
            onChangeText={setOtp}
            value={otp}
            keyboardType={'numeric'}
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
          <View style={{alignContent: 'flex-start'}}>
            <Text
              style={{
                color: 'red',
                fontFamily: 'Fredoka-Regular',
                fontSize: 12,
                textAlign: 'left',
                opacity: check ? 1 : 0,
              }}>
              Invalid OTP
            </Text>
          </View>

          {/* <CustomButton
            text="Confirm"
            onPress={handleSubmit(onConfirmPressed)}
          /> */}
          <Pressable
            onPress={onConfirmPressed}
            style={{
              alignContent: 'center',
              alignSelf: 'center',
              marginTop: 8,
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
              Confirm
            </Text>
          </Pressable>

          {/* <CustomButton
            text="Back to Sign in"
            onPress={onSignInPress}
            type="TERTIARY"
          /> */}
          <Pressable
            onPress={onSignInPress}
            style={{
              alignContent: 'center',
              alignSelf: 'center',
              marginTop: 20,
            }}>
            <Text style={{color: 'black', fontFamily: 'Fredoka-Regular'}}>
              Back to Sign in
            </Text>
          </Pressable>
        </View>
      </ScrollView>
      {loading ? <AppLoader /> : null}
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    // alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 18,
    color: 'black',
    margin: 10,
    marginTop: 15,
    fontFamily: 'Fredoka-Medium',
    textAlign: 'center',
  },
  text: {
    color: 'gray',
    marginVertical: 10,
  },
  link: {
    color: '#FDB075',
  },
});

export default ConfirmEmailScreen;
