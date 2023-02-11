import {View, Text, Pressable, FlatList} from 'react-native';
import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import HistoryDish from '../components/HistoryDish';

const HistoryDetailScreen = () => {
  const route = useRoute();
  const dishdetail = route.params?.dishDetail;
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <Text
        style={{
          color: 'black',
          fontFamily: 'Fredoka-Regular',
          alignSelf: 'center',
          marginVertical: 10,
          fontSize: 16,
        }}>
        Order Details:
      </Text>
      <FlatList
        data={dishdetail}
        renderItem={({item}) => <HistoryDish dish={item} />}
        keyExtractor={item => item._id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default HistoryDetailScreen;
