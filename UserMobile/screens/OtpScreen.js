import {View, Text, TextInput, Pressable, Image} from 'react-native';
import React, {useState} from 'react';
import axios from 'axios';
import {useAuthContext} from '../src/Context/AuthContext';

const OtpScreen = () => {
  const {users} = useAuthContext();
  const {tokens} = useAuthContext();
  const [text, setText] = useState(null);
  const [status, setStatus] = useState(null);
  const onPress = async () => {
    const response = await axios.post(
      `http://13.233.214.112:8000/api/v1/user/${users}/validatePaymentOtp`,
      {otp: text},
      {headers: {Authorization: `Bearer ${tokens}`}},
    );
    setStatus(response.data.res);
  };
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <Text
        style={{
          color: 'black',
          fontFamily: 'Fredoka-Regular',
          fontSize: 20,
          alignSelf: 'center',
          marginTop: 15,
          opacity: status === 'success' ? 0 : 1,
        }}>
        Please provide this OTP to canteen administrator, your OTP is:
      </Text>
      <Text
        style={{
          color: 'black',
          fontFamily: 'Fredoka-Medium',
          fontSize: 27,
          alignSelf: 'center',
          marginTop: 15,
          opacity: status === 'success' ? 0 : 1,
        }}>
        1111
      </Text>
      <Text
        style={{
          color: 'black',
          fontFamily: 'Fredoka-Regular',
          fontSize: 20,
          alignSelf: 'center',
          marginTop: 15,
          opacity: status === 'success' ? 0 : 1,
        }}></Text>
      <Pressable
        onPress={onPress}
        style={{
          opacity: status === 'success' ? 0 : 1,
          alignItems: 'center',
          alignSelf: 'center',
          backgroundColor: '#f7442d',
          paddingVertical: 10,
          paddingHorizontal: 20,
        }}>
        <Text
          style={{fontFamily: 'Fredoka-Regular', color: 'white', fontSize: 15}}>
          Validate Otp
        </Text>
      </Pressable>
      <Image
        source={{
          uri: 'https://t3.ftcdn.net/jpg/03/38/92/74/360_F_338927425_ORe15ecNoxoWiV78YSdAQXXoHZzsNY4c.jpg',
        }}
        style={{
          width: 200,
          height: 200,
          opacity: status === 'success' ? 1 : 0,
          alignSelf: 'center',
        }}
      />
      <Text
        style={{
          opacity: status === 'success' ? 1 : 0,
          fontFamily: 'Fredoka-Regular',
          color: 'black',
          alignSelf: 'center',
          fontSize: 28,
        }}>
        Done
      </Text>
    </View>
  );
};

export default OtpScreen;
