import {View, Text, Pressable, Image} from 'react-native';
import React, {useEffect} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDeisgn from 'react-native-vector-icons/AntDesign';
import axios from 'axios';

const HistoryScreenComponent = ({favourite}) => {
  const navigation = useNavigation();
  const favouriteDish = favourite['items'];
  const onClick = () => {
    navigation.navigate('HistoryDetailScreen', {
      dishDetail: favouriteDish,
    });
  };

  var date = favourite?.createdAt;
  var finalDate = date?.substring(0, 10);
  return (
    <Pressable
      onPress={onClick}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        margin: 10,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,

        elevation: 5,
      }}>
      <View style={{flex: 8}}>
        <Text
          style={{
            color: 'black',
            fontFamily: 'Fredoka-Regular',
            fontSize: 13,
            marginBottom: 5,
          }}>
          OTP: {favourite.otp}
        </Text>
        <Text
          style={{
            color: 'black',
            fontFamily: 'Fredoka-Regular',
            fontSize: 13,
            marginBottom: 5,
          }}>
          Total Price: Rs.{favourite.price}
        </Text>
        <Text
          style={{
            color: 'black',
            fontFamily: 'Fredoka-Regular',
            fontSize: 13,
            marginBottom: 5,
          }}>
          Date: {finalDate}
        </Text>
        <Text
          style={{
            color: 'black',
            fontFamily: 'Fredoka-Regular',
            fontSize: 13,
          }}>
          Paid through: {favourite?.paymentmode}
        </Text>
      </View>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <AntDeisgn name="caretright" color={'black'} size={23} />
      </View>
    </Pressable>
  );
};

export default HistoryScreenComponent;
