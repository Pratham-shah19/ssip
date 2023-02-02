import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
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
  } = useAuthContext();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const onSignInPressed = async data => {
    // console.log(data);
    setLoginPending(true);
    const response = await axios.post(
      'http://10.0.2.2:3000/api/v1/user/login',
      data,
    );
    // http://10.0.2.2:3000/api/v1/user/login
    // http://54.90.48.129:3000/
    // console.log('hello');
    // console.log(response.data.token);

    const obj = {
      token: response.data.token,
      userID: response.data.user.id,
      name: response.data.user.name,
    };
    const jsonValue = JSON.stringify(obj);
    await AsyncStorage.setItem('userDetail', jsonValue);
    setTokens(response.data.token);
    setName(response.data.user.name);
    console.log('b', response.data.token);
    await getData();
    setTimeout(() => console.log('a', tokens), 1000);
    setLoginPending(false);
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
            style={{height: 130, width: 130, borderRadius: 20, marginTop: 30}}
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
        <CustomInput
          name="email"
          placeholder="Email"
          control={control}
          rules={{required: 'Email is required'}}
        />
        <CustomInput
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
        />

        <CustomButton
          text={loading ? 'Loading...' : 'Sign In'}
          onPress={handleSubmit(onSignInPressed)}
        />

        <CustomButton
          text="Forgot password?"
          onPress={onForgotPasswordPressed}
          type="TERTIARY"
        />

        {/* <SocialSignInButtons /> */}

        <CustomButton
          text="Don't have an account? Create one"
          onPress={onSignUpPress}
          type="TERTIARY"
        />
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
