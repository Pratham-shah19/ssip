import {View, Text, Pressable} from 'react-native';
import React from 'react';
import {useAuthContext} from '../src/Context/AuthContext';

const FavouriteScreen = () => {
  const {items} = useAuthContext();
  return (
    <View>
      <Pressable onPress={() => console.log(items)}>
        <Text>hello</Text>
      </Pressable>
      <Text>FavouriteScreen</Text>
    </View>
  );
};

export default FavouriteScreen;
