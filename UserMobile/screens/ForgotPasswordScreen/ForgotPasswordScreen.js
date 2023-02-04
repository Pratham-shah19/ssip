// import React, {useState} from 'react';
// import {View, Text, StyleSheet, ScrollView, Alert} from 'react-native';
// import CustomInput from '../../components/CustomInput';
// import CustomButton from '../../components/CustomButton';
// import SocialSignInButtons from '../../components/SocialSignInButtons';
// import {useNavigation} from '@react-navigation/core';
// import {useForm} from 'react-hook-form';
// import axios from 'axios';
// // import {Auth} from 'aws-amplify';

// const ForgotPasswordScreen = () => {
//   const {control, handleSubmit} = useForm();
//   const navigation = useNavigation();

//   const onSendPressed = async data => {
//     // try {
//     //   // await Auth.forgotPassword(data.username);
//     //   navigation.navigate('NewPassword');
//     // } catch (e) {
//     //   Alert.alert('Oops', e.message);
//     // }
//     const response = await axios.patch(
//       'http://3.109.165.137:3000/api/v1/user/forgotpassword',
//       data,
//     );
//     console.log(response.data);
//     if (response.data.otpsent) {
//       navigation.navigate('ConfirmEmail', {email: data.email});
//     }
//   };

//   const onSignInPress = () => {
//     navigation.navigate('SignIn');
//   };

//   return (
//     <ScrollView showsVerticalScrollIndicator={false}>
//       <View style={styles.root}>
//         <Text style={styles.title}>Reset your password</Text>

//         <CustomInput
//           name="email"
//           control={control}
//           placeholder="Email"
//           rules={{
//             required: 'Email is required',
//           }}
//         />

//         <CustomButton text="Send" onPress={handleSubmit(onSendPressed)} />

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

// export default ForgotPasswordScreen;
import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Alert, Image} from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import SocialSignInButtons from '../../components/SocialSignInButtons';
import {useNavigation} from '@react-navigation/core';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import AppLoader from '../../components/AppLoader';
// import {Auth} from 'aws-amplify';

const ForgotPasswordScreen = () => {
  const {control, handleSubmit} = useForm();
  const navigation = useNavigation();
  const [check, setCheck] = useState(false);
  const [loading, setLoading] = useState(false);
  const onSendPressed = async data => {
    try {
      setLoading(true);
      const response = await axios.patch(
        'http://3.109.165.137:3000/api/v1/user/forgotpassword',
        data,
      );
      // console.log(response.data);
      if (response.data.otpsent) {
        navigation.navigate('ConfirmEmail', {email: data.email});
      }
      setLoading(false);
    } catch (err) {
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
            source={require('../../data/forgotpass.jpg')}
            style={{
              height: 230,
              width: 230,
              borderRadius: 20,
              marginTop: 30,
              alignSelf: 'center',
            }}
          />
          <Text style={styles.title}>Reset your password</Text>

          <CustomInput
            name="email"
            control={control}
            placeholder="Email"
            rules={{
              required: 'Email is required',
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
              Email is never registered.
            </Text>
          </View>

          <CustomButton text="Send" onPress={handleSubmit(onSendPressed)} />

          <CustomButton
            text="Back to Sign in"
            onPress={onSignInPress}
            type="TERTIARY"
          />
        </View>
      </ScrollView>
      {/* {AppLoader ? loading : null} */}
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
    fontSize: 19,
    color: 'black',
    margin: 10,
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

export default ForgotPasswordScreen;
