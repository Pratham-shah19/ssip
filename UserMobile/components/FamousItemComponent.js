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
          width: 70,
          height: 70,
          borderRadius: 50,
          margin: 10,
          marginBottom: 50,
        }}>
        <Image
          style={{height: '100%', width: '100%', borderRadius: 50}}
          source={{
            uri: food?.imageUrl,
          }}></Image>
        {/* <S3Image
          imgKey={props.restaurantImage}
          style={{height: '100%', width: '100%', borderRadius: 50}}
        /> */}
        <Text
          style={{
            alignSelf: 'center',
            alignContent: 'center',
            textAlign: 'center',
            marginTop: 10,
            fontSize: 12.5,
            color: 'black',
            fontFamily: 'Fredoka-Regular',
          }}>
          {food?.name}
        </Text>
      </View>
    </Pressable>
  );
};

export default FamousItemComponent;
