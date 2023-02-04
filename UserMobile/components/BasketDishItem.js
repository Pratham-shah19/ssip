import {View, Text, Image, Pressable} from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useAuthContext} from '../src/Context/AuthContext';
import axios from 'axios';

const BasketDishItem = ({basketDish}) => {
  const {users, onCreateOrder, tokens} = useAuthContext();
  const onDelete = async () => {
    // console.log(basketDish.items._id);
    const response = await axios.patch(
      `http://65.0.189.107:8000/api/v1/user/${users}/removeItem`,
      {itemId: basketDish.items._id},
      {headers: {Authorization: `Bearer ${tokens}`}},
    );
    await onCreateOrder();
  };
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 14,
        padding: 5,
      }}>
      <View style={{flex: 1}}>
        <Image
          source={{
            uri: basketDish.items.imageUrl,
          }}
          style={{height: 65, width: 65, borderRadius: 10}}
        />
      </View>
      <View style={{flex: 3, marginHorizontal: 8}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={{
                color: 'black',
                fontSize: 15,
                fontFamily: 'Fredoka-Regular',
              }}>
              {basketDish.items.name}
            </Text>
            <View
              style={{
                height: 16,
                width: 16,
                backgroundColor: '#d6d6d6',
                alignContent: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 3,
                marginHorizontal: 4,
              }}>
              <Text style={{color: 'black', fontSize: 12}}>
                {basketDish.qty}
              </Text>
            </View>
          </View>
          {/* <Text
            style={{
              color: 'black',
              fontSize: 15,
              fontFamily: 'Fredoka-Regular',
            }}>
            {'\u20B9'} {basketDish.items.price}
          </Text> */}
        </View>
        <View>
          <Text
            numberOfLines={1}
            style={{
              color: 'black',
              fontSize: 13,
              fontFamily: 'Fredoka-Regular',
            }}>
            {basketDish.items.category}
          </Text>
        </View>
      </View>
      <View
        style={{
          flex: 0.8,
          alignItems: 'center',
          alignContent: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            color: 'black',
            fontSize: 15,
            fontFamily: 'Fredoka-Regular',
          }}>
          {'\u20B9'} {basketDish.items.price}
        </Text>
      </View>
      <Pressable
        onPress={onDelete}
        style={{
          flex: 0.5,
          alignItems: 'center',
          alignContent: 'center',
          justifyContent: 'center',
        }}>
        <MaterialIcons name="delete" color={'black'} size={24} />
      </Pressable>
    </View>
  );
};

export default BasketDishItem;
