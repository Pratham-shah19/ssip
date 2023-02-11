import {View, Text, Image, Pressable} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const SearchComponent = ({dish}) => {
  const navigation = useNavigation();
  const onPress = () => {
    navigation.navigate('DishDetailScreen', {id: dish._id});
  };
  return (
    <Pressable
      onPress={onPress}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
      }}>
      <Text
        style={{color: 'black', fontFamily: 'Fredoka-Regular', fontSize: 12}}>
        {dish.name}
      </Text>
      <Image
        source={{uri: dish.imageUrl}}
        style={{width: 40, height: 40, borderRadius: 20}}
      />
    </Pressable>
  );
};

export default SearchComponent;
