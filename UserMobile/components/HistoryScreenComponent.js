import {View, Text, Pressable, Image} from 'react-native';
import React, {useEffect} from 'react';
// import {S3Image} from 'aws-amplify-react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
// import {Favourites} from '../../src/models';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
// import {DataStore} from 'aws-amplify';

const HistoryScreenComponent = ({favourite}) => {
  const navigation = useNavigation();
  const rating = `${favourite?.items.$numberDecimal}`;
  //   const onPress = () => {
  //     navigation.navigate('ProductScreen', {id: favourite.Restaurant?.id});
  //   };
  //   const onDelete = async () => {
  //     const todelete = await DataStore.query(Favourites, favourite.id);
  //     DataStore.delete(todelete);
  //   };
  return (
    <View>
      <Pressable
        onPress={() => {}}
        style={{
          flexDirection: 'row',
          marginBottom: 20,
          marginVertical: 10,
          backgroundColor: 'white',
        }}>
        <View style={{flex: 2, alignContent: 'center'}}>
          <Image
            source={{uri: favourite?.items.imageUrl}}
            style={{
              height: 100,
              width: 90,
              alignSelf: 'center',
              borderRadius: 10,
            }}
          />
        </View>
        <View style={{flex: 4, justifyContent: 'center'}}>
          <View>
            <Text
              style={{
                fontFamily: 'Fredoka-Medium',
                color: 'black',
                fontSize: 15,
              }}>
              {favourite?.items[0].dishName.name}
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Entypo name="star" size={15} color="#666563" />
              <Text
                style={{
                  color: '#666563',
                  fontSize: 12,
                  marginLeft: 4,
                  fontWeight: 'bold',
                }}>
                {rating}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  marginBottom: 8,
                  color: '#666563',
                  marginLeft: 6,
                  fontWeight: 'bold',
                }}>
                .
              </Text>
              <Text
                style={{
                  color: '#666563',
                  fontSize: 12,
                  marginLeft: 8,
                  fontWeight: 'bold',
                }}>
                {/* {favourite?.items?.timeToDeliver} mins */}
              </Text>
              <Text
                style={{
                  marginBottom: 8,
                  color: '#666563',
                  marginLeft: 6,
                  fontWeight: 'bold',
                }}>
                .
              </Text>
            </View>
          </View>
          <View>
            <Text
              style={{
                color: 'gray',
                fontFamily: 'Fredoka-Regular',
                fontSize: 13,
              }}>
              {favourite?.items?.category}
            </Text>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            alignContent: 'center',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Pressable
            style={{
              flex: 1,
              alignItems: 'center',
              alignContent: 'center',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {}}>
            <MaterialIcons name="delete" size={25} color={'#878787'} />
          </Pressable>
        </View>
      </Pressable>
    </View>
  );
};

export default HistoryScreenComponent;
