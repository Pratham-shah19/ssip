import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
  useWindowDimensions,
  TextInput,
  Pressable,
  Linking,
} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {useForm} from 'react-hook-form';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import AppLoader from '../../components/AppLoader';

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const SignUpScreen = () => {
  const {height} = useWindowDimensions();
  const {control, handleSubmit, watch} = useForm();
  const pwd = watch('password');
  const navigation = useNavigation();
  const [loadingPending, setLoadingPending] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [passwordWrong, setPasswordWrong] = useState(false);
  const [emailWrong, setEmailWrong] = useState(false);
  const [passwordMin, setPasswordMin] = useState(false);

  const onRegisterPressed = async data => {
    setPasswordMin(false);
    setEmailWrong(false);
    setPasswordWrong(false);
    if (!name || !address || !email || !password) {
      Alert.alert('Enter all required details.');
    } else {
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
      if (reg.test(email) === false) {
        setEmailWrong(true);
      } else {
        if (password.length >= 8) {
          if (password == passwordRepeat) {
            try {
              setLoadingPending(true);
              const response = await axios.post(
                'http://3.109.165.137:3000/api/v1/user/register',
                {
                  name: name,
                  email: email,
                  address: address,
                  password: password,
                },
              );
              const obj = {
                token: response.data.token,
                userID: response.data.user.id,
                name: response.data.user.name,
              };
              const jsonValue = JSON.stringify(obj);
              await AsyncStorage.setItem('userDetail', jsonValue);
              navigation.navigate('SignIn');
              setLoadingPending(false);
            } catch (err) {
              // setCheck(true);
              setLoadingPending(false);
              Alert.alert('Already registered.');
            }
          } else {
            setPasswordWrong(true);
          }
        } else {
          setPasswordMin(true);
        }
      }
    }
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
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{backgroundColor: 'white'}}>
        <View style={styles.root}>
          <Image
            source={require('../../data/logo.png')}
            style={[styles.logo, {height: height * 0.25}]}
            resizeMode="contain"
          />
          {/* </View> */}
          <Text style={styles.title}>Create an account</Text>

          <Text
            style={{
              color: 'black',
              fontSize: 14,
              fontFamily: 'Fredoka-Regular',
            }}>
            Name:
          </Text>
          <TextInput
            onChangeText={setName}
            value={name}
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
              marginBottom: 10,
            }}
          />
          <Text
            style={{
              color: 'black',
              fontSize: 14,
              fontFamily: 'Fredoka-Regular',
            }}>
            Email:
          </Text>
          <TextInput
            onChangeText={setEmail}
            value={email}
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
          <Text
            style={{
              color: 'red',
              fontFamily: 'Fredoka-Regular',
              fontSize: 10,
              opacity: emailWrong ? 1 : 0,
            }}>
            Email is invalid
          </Text>
          <Text
            style={{
              color: 'black',
              fontSize: 14,
              fontFamily: 'Fredoka-Regular',
            }}>
            Address:
          </Text>
          <TextInput
            onChangeText={setAddress}
            value={address}
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
              marginBottom: 10,
            }}
          />
          <Text
            style={{
              color: 'black',
              fontSize: 14,
              fontFamily: 'Fredoka-Regular',
            }}>
            Password:
          </Text>
          <TextInput
            onChangeText={setPassword}
            value={password}
            secureTextEntry={true}
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
              // marginBottom: 10,
            }}
          />
          <Text
            style={{
              color: 'red',
              fontSize: 10,
              fontFamily: 'Fredoka-Regular',
              opacity: passwordMin ? 1 : 0,
            }}>
            Password should be of minimum 8 characters
          </Text>
          <Text
            style={{
              color: 'black',
              fontSize: 14,
              fontFamily: 'Fredoka-Regular',
            }}>
            Repeat Password:
          </Text>
          <TextInput
            onChangeText={setPasswordRepeat}
            value={passwordRepeat}
            secureTextEntry={true}
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
              marginBottom: 10,
            }}
          />
          <Text
            style={{
              color: 'red',
              fontSize: 10,
              fontFamily: 'Fredoka-Regular',
              opacity: passwordWrong ? 1 : 0,
            }}>
            Password not matched
          </Text>
          <Pressable
            onPress={onRegisterPressed}
            style={{
              alignContent: 'center',
              alignSelf: 'center',
              marginTop: 10,
              backgroundColor: '#f35858',
              paddingVertical: 12,
              borderRadius: 9,
            }}>
            <Text
              style={{
                color: 'white',
                fontFamily: 'Fredoka-Medium',
                marginHorizontal: 120,
                fontSize: 15,
              }}>
              Register
            </Text>
          </Pressable>

          <Text style={styles.text}>
            By registering, you confirm that you accept our{' '}
            <Text
              style={styles.link}
              onPress={() =>
                Linking.openURL(
                  'https://www.privacypolicies.com/live/2eefdb92-5ac6-4457-87db-172f4af94760',
                )
              }>
              Terms of Use
            </Text>{' '}
            and{' '}
            <Text
              style={styles.link}
              onPress={() =>
                Linking.openURL(
                  'https://www.privacypolicies.com/live/2eefdb92-5ac6-4457-87db-172f4af94760',
                )
              }>
              Privacy Policy
            </Text>
          </Text>
          <Pressable
            onPress={onSignInPress}
            style={{
              alignContent: 'center',
              alignSelf: 'center',
              marginTop: 20,
            }}>
            <Text style={{color: 'black', fontFamily: 'Fredoka-Regular'}}>
              Have an account? Sign in
            </Text>
          </Pressable>
        </View>
      </ScrollView>
      {loadingPending ? <AppLoader /> : null}
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    padding: 20,
  },
  title: {
    fontSize: 18,
    color: 'black',
    fontFamily: 'Fredoka-Medium',
    textAlign: 'center',
    marginBottom: 10,
  },
  text: {
    color: 'gray',
    marginTop: 10,
    fontFamily: 'Fredoka-Regular',
    fontSize: 12,
  },
  link: {
    color: '#FDB075',
  },
  logo: {
    width: 260,
    maxWidth: 260,
    maxHeight: 260,
    alignSelf: 'center',
  },
});

export default SignUpScreen;
