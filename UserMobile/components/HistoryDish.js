import {View, Text, Image, Pressable} from 'react-native';
import React from 'react';

const HistoryDish = ({dish}) => {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center', padding: 10}}>
      <View style={{flex: 1}}>
        <Image
          source={{uri: dish.dish.imageUrl}}
          style={{height: 44, width: 44, borderRadius: 22}}
        />
      </View>
      <View style={{flex: 5}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{color: 'black', fontFamily: 'Fredoka-Regular'}}>
            {dish.dish.name} x {dish.qty}
          </Text>
          <Text style={{color: 'black'}}> = {dish.dish.price * dish.qty}</Text>
        </View>
        <View>
          <Text style={{color: 'grey', fontFamily: 'Fredoka-Regular'}}>
            {dish.dish.category}
          </Text>
        </View>
      </View>
      <Pressable
        style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text
          style={{
            color: 'black',
            fontFamily: 'Fredoka-Regular',
            marginBottom: 12,
          }}>
          Rate
        </Text>
      </Pressable>
    </View>
  );
};

export default HistoryDish;
