// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   Alert,
//   Image,
//   useWindowDimensions,
// } from 'react-native';
// import CustomInput from '../../components/CustomInput';
// import CustomButton from '../../components/CustomButton';
// import SocialSignInButtons from '../../components/SocialSignInButtons';
// import {useNavigation} from '@react-navigation/core';
// import {useForm} from 'react-hook-form';
// // import {Auth} from 'aws-amplify';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Feather from 'react-native-vector-icons/Feather';
// import axios from 'axios';
// import AppLoader from '../../components/AppLoader';

// const EMAIL_REGEX =
//   /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

// const SignUpScreen = () => {
//   const {height} = useWindowDimensions();
//   const {control, handleSubmit, watch} = useForm();
//   const pwd = watch('password');
//   const navigation = useNavigation();
//   const [loadingPending, setLoadingPending] = useState(false);
//   const storeData = async value => {
//     try {
//       const jsonValue = JSON.stringify(value);
//       await AsyncStorage.setItem('useDetail', jsonValue);
//     } catch (e) {
//       // saving error
//     }
//   };

//   const onRegisterPressed = async data => {
//     setLoadingPending(true);
//     const {address, password, email, name} = data;
//     const response = await axios.post(
//       'http://3.109.165.137:3000/api/v1/user/register',
//       data,
//     );
//     // const responsedata = await fetch(
//     //   'http://10.0.2.2:3000/api/v1/user/register',
//     //   {
//     //     method: 'POST',
//     //     body: data,
//     //   },
//     // );
//     // const response = await responsedata.json();
//     // console.log(response.data);
//     const obj = {
//       token: response.data.token,
//       userID: response.data.user.id,
//       name: response.data.user.name,
//     };
//     const jsonValue = JSON.stringify(obj);
//     await AsyncStorage.setItem('userDetail', jsonValue);
//     navigation.navigate('SignIn');
//     // try {
//     //   await Auth.signUp({
//     //     address,
//     //     password,
//     //     attributes: {email, name, preferred_username: address},
//     //   });

//     //   navigation.navigate('ConfirmEmail', {address});
//     // } catch (e) {
//     //   Alert.alert('Oops', e.message);
//     // }
//     setLoadingPending(false);
//   };

//   const onSignInPress = () => {
//     navigation.navigate('SignIn');
//   };

//   const onTermsOfUsePressed = () => {
//     console.warn('onTermsOfUsePressed');
//   };

//   const onPrivacyPressed = () => {
//     console.warn('onPrivacyPressed');
//   };

//   return (
//     <>
//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         style={{backgroundColor: 'white'}}>
//         <View style={styles.root}>
//           {/* <View style={{flexDirection: 'row', alignContent: 'center'}}>
//           <Feather name="chevron-left" size={28} color={'black'} style={{}} /> */}
//           <Image
//             source={require('../../data/logo.png')}
//             style={[styles.logo, {height: height * 0.25}]}
//             resizeMode="contain"
//           />
//           {/* </View> */}
//           <Text style={styles.title}>Create an account</Text>

//           <CustomInput
//             name="name"
//             control={control}
//             placeholder="Name"
//             rules={{
//               required: 'Name is required',
//               minLength: {
//                 value: 3,
//                 message: 'Name should be at least 3 characters long',
//               },
//               maxLength: {
//                 value: 24,
//                 message: 'Name should be max 24 characters long',
//               },
//             }}
//           />

//           <CustomInput
//             name="address"
//             control={control}
//             placeholder="Address"
//             rules={{
//               required: 'Address is required',
//               minLength: {
//                 value: 3,
//                 message: 'Address should be at least 3 characters long',
//               },
//               maxLength: {
//                 value: 24,
//                 message: 'Address should be max 24 characters long',
//               },
//             }}
//           />
//           <CustomInput
//             name="email"
//             control={control}
//             placeholder="Email"
//             rules={{
//               required: 'Email is required',
//               pattern: {value: EMAIL_REGEX, message: 'Email is invalid'},
//             }}
//           />
//           <CustomInput
//             name="password"
//             control={control}
//             placeholder="Password"
//             secureTextEntry
//             rules={{
//               required: 'Password is required',
//               minLength: {
//                 value: 8,
//                 message: 'Password should be at least 8 characters long',
//               },
//             }}
//           />
//           <CustomInput
//             name="password-repeat"
//             control={control}
//             placeholder="Repeat Password"
//             secureTextEntry
//             rules={{
//               validate: value => value === pwd || 'Password do not match',
//             }}
//           />

//           <CustomButton
//             text="Register"
//             onPress={handleSubmit(onRegisterPressed)}
//           />

//           <Text style={styles.text}>
//             By registering, you confirm that you accept our{' '}
//             <Text style={styles.link} onPress={onTermsOfUsePressed}>
//               Terms of Use
//             </Text>{' '}
//             and{' '}
//             <Text style={styles.link} onPress={onPrivacyPressed}>
//               Privacy Policy
//             </Text>
//           </Text>

//           {/* <SocialSignInButtons /> */}

//           <CustomButton
//             text="Have an account? Sign in"
//             onPress={onSignInPress}
//             type="TERTIARY"
//           />
//         </View>
//       </ScrollView>
//       {loadingPending ? <AppLoader /> : null}
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   root: {
//     alignItems: 'center',
//     padding: 20,
//   },
//   title: {
//     fontSize: 20,
//     fontFamily: 'OpenSans-Medium',
//     color: 'black',
//     margin: 10,
//   },
//   text: {
//     color: 'gray',
//     marginTop: 10,
//   },
//   link: {
//     color: '#FDB075',
//   },
//   logo: {
//     width: 130,
//     maxWidth: 130,
//     maxHeight: 130,
//     marginBottom: 10,
//     borderRadius: 65,
//   },
// });

// export default SignUpScreen;
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
import AppLoader from '../../components/AppLoader';

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const SignUpScreen = () => {
  const {height} = useWindowDimensions();
  const {control, handleSubmit, watch} = useForm();
  const pwd = watch('password');
  const navigation = useNavigation();
  const [loadingPending, setLoadingPending] = useState(false);
  const [onChangeText, setOnChangeText] = useState('');
  const [check, setCheck] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [passwordWrong, setPasswordWrong] = useState(false);
  const [emailWrong, setEmailWrong] = useState(false);
  const [passwordMin, setPasswordMin] = useState(false);
  const storeData = async value => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('useDetail', jsonValue);
    } catch (e) {
      // saving error
    }
  };

  const onRegisterPressed = async data => {
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
              // const {address, password, email, name} = data;
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
              marginBottom: 10,
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
              // paddingHorizontal: 135,
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
          {/* <CustomInput
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
          /> */}

          {/* <CustomInput
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
          /> */}
          {/* <CustomInput
            name="email"
            control={control}
            placeholder="Email"
            rules={{
              required: 'Email is required',
              pattern: {value: EMAIL_REGEX, message: 'Email is invalid'},
            }}
          /> */}
          {/* <CustomInput
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
          /> */}
          {/* <CustomInput
            name="password-repeat"
            control={control}
            placeholder="Repeat Password"
            secureTextEntry
            rules={{
              validate: value => value === pwd || 'Password do not match',
            }}
          /> */}

          {/* <CustomButton
            text="Register"
            onPress={handleSubmit(onRegisterPressed)}
          /> */}

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

          {/* <CustomButton
            text="Have an account? Sign in"
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
