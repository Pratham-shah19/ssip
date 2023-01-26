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
  // const id = favouriteDish.dish;
  const onClick = () => {
    console.log(favouriteDish);
    navigation.navigate('HistoryDetailScreen', {
      dishDetail: favouriteDish,
    });
  };
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

        elevation: 9,
      }}>
      <View style={{flex: 8}}>
        <Text
          style={{
            color: 'black',
            fontFamily: 'Fredoka-Regular',
            fontSize: 14,
            marginBottom: 5,
          }}>
          Order Id: {favourite._id}
        </Text>
        <Text
          style={{
            color: 'black',
            fontFamily: 'Fredoka-Regular',
            fontSize: 14,
            marginBottom: 5,
          }}>
          Total Price: Rs.{favourite.price}
        </Text>
        <Text
          style={{
            color: 'black',
            fontFamily: 'Fredoka-Regular',
            fontSize: 14,
          }}>
          Date:
        </Text>
        <Text
          style={{
            color: 'black',
            fontFamily: 'Fredoka-Regular',
            fontSize: 14,
          }}>
          Paid through:
        </Text>
      </View>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <AntDeisgn name="caretright" color={'black'} size={23} />
      </View>
    </Pressable>
  );
};

export default HistoryScreenComponent;
