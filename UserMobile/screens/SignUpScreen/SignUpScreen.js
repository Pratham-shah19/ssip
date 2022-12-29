import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
  useWindowDimensions,
} from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import SocialSignInButtons from '../../components/SocialSignInButtons';
import {useNavigation} from '@react-navigation/core';
import {useForm} from 'react-hook-form';
// import {Auth} from 'aws-amplify';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Feather from 'react-native-vector-icons/Feather';
import axios from 'axios';

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const SignUpScreen = () => {
  const {height} = useWindowDimensions();
  const {control, handleSubmit, watch} = useForm();
  const pwd = watch('password');
  const navigation = useNavigation();
  const storeData = async value => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('useDetail', jsonValue);
    } catch (e) {
      // saving error
    }
  };

  const onRegisterPressed = async data => {
    const {address, password, email, name} = data;
    const response = await axios.post(
      'http://10.0.2.2:3000/api/v1/user/register',
      data,
    );
    // const responsedata = await fetch(
    //   'http://10.0.2.2:3000/api/v1/user/register',
    //   {
    //     method: 'POST',
    //     body: data,
    //   },
    // );
    // const response = await responsedata.json();
    // console.log(response.data);
    const obj = {
      token: response.data.token,
      userID: response.data.user.id,
      name: response.data.user.name,
    };
    const jsonValue = JSON.stringify(obj);
    await AsyncStorage.setItem('userDetail', jsonValue);
    navigation.navigate('SignIn');
    // try {
    //   await Auth.signUp({
    //     address,
    //     password,
    //     attributes: {email, name, preferred_username: address},
    //   });

    //   navigation.navigate('ConfirmEmail', {address});
    // } catch (e) {
    //   Alert.alert('Oops', e.message);
    // }
  };

  const onSignInPress = () => {
    navigation.navigate('SignIn');
  };

  const onTermsOfUsePressed = () => {
    console.warn('onTermsOfUsePressed');
  };

  const onPrivacyPressed = () => {
    console.warn('onPrivacyPressed');
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{backgroundColor: 'white'}}>
      <View style={styles.root}>
        {/* <View style={{flexDirection: 'row', alignContent: 'center'}}>
          <Feather name="chevron-left" size={28} color={'black'} style={{}} /> */}
        <Image
          source={{
            uri: 'https://gandhinagarportal.com/wp-content/uploads/2012/05/government_gujarat_gandhinagar.jpg',
          }}
          style={[styles.logo, {height: height * 0.25}]}
          resizeMode="contain"
        />
        {/* </View> */}
        <Text style={styles.title}>Create an account</Text>

        <CustomInput
          name="name"
          control={control}
          placeholder="Name"
          rules={{
            required: 'Name is required',
            minLength: {
              value: 3,
              message: 'Name should be at least 3 characters long',
            },
            maxLength: {
              value: 24,
              message: 'Name should be max 24 characters long',
            },
          }}
        />

        <CustomInput
          name="address"
          control={control}
          placeholder="Address"
          rules={{
            required: 'Address is required',
            minLength: {
              value: 3,
              message: 'Address should be at least 3 characters long',
            },
            maxLength: {
              value: 24,
              message: 'Address should be max 24 characters long',
            },
          }}
        />
        <CustomInput
          name="email"
          control={control}
          placeholder="Email"
          rules={{
            required: 'Email is required',
            pattern: {value: EMAIL_REGEX, message: 'Email is invalid'},
          }}
        />
        <CustomInput
          name="password"
          control={control}
          placeholder="Password"
          secureTextEntry
          rules={{
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password should be at least 8 characters long',
            },
          }}
        />
        <CustomInput
          name="password-repeat"
          control={control}
          placeholder="Repeat Password"
          secureTextEntry
          rules={{
            validate: value => value === pwd || 'Password do not match',
          }}
        />

        <CustomButton
          text="Register"
          onPress={handleSubmit(onRegisterPressed)}
        />

        <Text style={styles.text}>
          By registering, you confirm that you accept our{' '}
          <Text style={styles.link} onPress={onTermsOfUsePressed}>
            Terms of Use
          </Text>{' '}
          and{' '}
          <Text style={styles.link} onPress={onPrivacyPressed}>
            Privacy Policy
          </Text>
        </Text>

        {/* <SocialSignInButtons /> */}

        <CustomButton
          text="Have an account? Sign in"
          onPress={onSignInPress}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontFamily: 'OpenSans-Medium',
    color: 'black',
    margin: 10,
  },
  text: {
    color: 'gray',
    marginTop: 10,
  },
  link: {
    color: '#FDB075',
  },
  logo: {
    width: '70%',
    maxWidth: 300,
    maxHeight: 200,
    marginBottom: 10,
  },
});

export default SignUpScreen;
