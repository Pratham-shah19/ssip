import React from 'react';
import {View, Text, Image, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const FamousItemComponent = ({food}) => {
  const navigation = useNavigation();
  const onPress = () => {
    navigation.navigate('DishDetailScreen', {id: food._id});
  };
  return (
    <Pressable onPress={onPress}>
      <View
        style={{
          width: 65,
          height: 65,
          borderRadius: 35,
          margin: 10,
          marginBottom: 40,
        }}>
        <Image
          style={{height: '100%', width: '100%', borderRadius: 50}}
          source={{
            uri: food?.imageUrl,
          }}></Image>
        <Text
          style={{
            alignSelf: 'center',
            alignContent: 'center',
            textAlign: 'center',
            marginTop: 8,
            fontSize: 12,
            color: 'black',
            fontFamily: 'Fredoka-Regular',
          }}
          numberOfLines={2}>
          {food?.name}
        </Text>
      </View>
    </Pressable>
  );
};

export default FamousItemComponent;
