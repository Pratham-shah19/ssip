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
      `http://10.0.2.2:8000/api/v1/user/${users}/validatePaymentOtp`,
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
          fontSize: 23,
          alignSelf: 'center',
          marginTop: 15,
          opacity: status === 'success' ? 0 : 1,
        }}>
        Enter OTP :
      </Text>
      <TextInput
        style={{
          color: 'black',
          fontSize: 25,
          opacity: status === 'success' ? 0 : 1,
        }}
        placeholder="OTP"
        placeholderTextColor="#9a73ef"
        autoCapitalize="none"
        value={text}
        onChangeText={setText}
        keyboardType={'number-pad'}
      />
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
