// import React, {useState} from 'react';
// import {View, Text, StyleSheet, ScrollView, Alert} from 'react-native';
// import CustomInput from '../../components/CustomInput';
// // import CustomInput from '../../component'
// import CustomButton from '../../components/CustomButton';
// import SocialSignInButtons from '../../components/SocialSignInButtons';
// import {useNavigation} from '@react-navigation/native';
// import {useForm} from 'react-hook-form';
// import {useRoute} from '@react-navigation/native';
// import axios from 'axios';
// // import {Auth} from 'aws-amplify';

// const NewPasswordScreen = () => {
//   const {control, handleSubmit} = useForm();

//   const navigation = useNavigation();
//   const route = useRoute();
//   const email = route?.params.email;
//   const onSubmitPressed = async data => {
//     try {
//       const response = await axios.patch(
//         `http://13.233.214.112:8000/api/v1/user/${email}/updatePassword`,
//         data,
//       );
//       navigation.navigate('SignIn');
//     } catch (e) {
//       Alert.alert('Oops', e.message);
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
//           placeholder="Enter your new password"
//           name="password"
//           control={control}
//           secureTextEntry
//           rules={{
//             required: 'Password is required',
//             minLength: {
//               value: 8,
//               message: 'Password should be at least 8 characters long',
//             },
//           }}
//         />

//         <CustomButton text="Submit" onPress={handleSubmit(onSubmitPressed)} />

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

// export default NewPasswordScreen;
import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Alert} from 'react-native';
import CustomInput from '../../components/CustomInput';
// import CustomInput from '../../component'
import CustomButton from '../../components/CustomButton';
import SocialSignInButtons from '../../components/SocialSignInButtons';
import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import {useRoute} from '@react-navigation/native';
import axios from 'axios';
// import {Auth} from 'aws-amplify';

const NewPasswordScreen = () => {
  const {control, handleSubmit} = useForm();

  const navigation = useNavigation();
  const route = useRoute();
  const email = route?.params.email;
  const onSubmitPressed = async data => {
    try {
      const response = await axios.patch(
        `http://65.0.189.107:8000/api/v1/user/${email}/updatePassword`,
        data,
      );
      navigation.navigate('SignIn');
    } catch (e) {
      Alert.alert('Oops', e.message);
    }
  };

  const onSignInPress = () => {
    navigation.navigate('SignIn');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Reset your password</Text>

        <CustomInput
          placeholder="Enter your new password"
          name="password"
          control={control}
          secureTextEntry
          rules={{
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password should be at least 8 characters long',
            },
          }}
        />

        <CustomButton text="Submit" onPress={handleSubmit(onSubmitPressed)} />

        <CustomButton
          text="Back to Sign in"
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#051C60',
    margin: 10,
  },
  text: {
    color: 'gray',
    marginVertical: 10,
  },
  link: {
    color: '#FDB075',
  },
});

export default NewPasswordScreen;
