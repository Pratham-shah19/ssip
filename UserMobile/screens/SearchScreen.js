import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useAuthContext} from '../src/Context/AuthContext';
import axios from 'axios';
import SearchComponent from '../components/HomeScreenComponents/SearchComponent';

const SearchScreen = () => {
  const {dbUser, tokens} = useAuthContext();
  const [search, setSearch] = useState(null);
  const [searchResult, setSearchResult] = useState(null);
  const onPress = async () => {
    // console.log(tokens);
    if (search.length >= 2) {
      const response = await axios.get(
        `http://10.0.2.2:8000/api/v1/user/dishes/filter?search=${search}`,
        {headers: {Authorization: `Bearer ${tokens}`}},
      );
      // console.log(response.data.data);
      console.log(search);
      setSearchResult(response.data.data);
    } else {
      setSearchResult(null);
    }
  };
  const today = new Date();
  const greeting = () => {
    if (today.getHours() < 12 && today.getHours() > 6) {
      return 'Good Morning';
    } else if (today.getHours() > 12 && today.getHours() < 16) {
      return 'Good Afternoon!';
    } else if (today.getHours() > 16 && today.getHours() < 23) {
      return 'Good Evening!';
    } else {
      return 'Good Night!';
    }
  };
  return (
    <View style={{padding: 15, backgroundColor: 'white', flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <MaterialIcons name="location-pin" size={24} color={'#f35858'} />
          <View style={{marginHorizontal: 5}}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: '#f35858',
                  fontSize: 18,
                  fontFamily: 'Fredoka-SemiBold',
                }}>
                Sachivalay
              </Text>

              <AntDesign
                name="caretdown"
                size={16}
                style={{marginHorizontal: 4}}
                color={'#f35858'}
              />
            </TouchableOpacity>
            <Text
              style={{
                color: 'black',
                fontSize: 13,
                fontFamily: 'Fredoka-Regular',
              }}>
              Gandhinagar
            </Text>
          </View>
        </View>
        <TouchableOpacity>
          <Ionicons
            name="ios-notifications-outline"
            size={26}
            color={'black'}
          />
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row', marginTop: 14}}>
        <Text
          style={{
            color: 'black',
            fontSize: 17,
            fontFamily: 'Fredoka-Regular',
          }}>
          Hey {dbUser?.name},
        </Text>
        <Text
          style={{
            color: 'black',
            fontSize: 17,
            fontFamily: 'Fredoka-SemiBold',
          }}>
          {greeting()}
        </Text>
      </View>
      <View style={styles.searchSection}>
        <Ionicons
          style={styles.searchIcon}
          name="ios-search"
          size={20}
          color="gray"
        />
        <TextInput
          style={styles.input}
          value={search}
          onChangeText={setSearch}
          onTextInput={onPress}
          placeholder="Search dishes..."
          placeholderTextColor={'grey'}
          underlineColorAndroid="transparent"
        />
      </View>
      <View>
        <FlatList
          data={searchResult}
          renderItem={({item}) => <SearchComponent dish={item} />}
          keyExtractor={item => item._id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  searchSection: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // height: 200,
    backgroundColor: '#fff',
    marginTop: 14,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  searchIcon: {
    padding: 7,
    marginHorizontal: 4,
  },
  input: {
    flex: 1,

    paddingLeft: 0,
    borderRadius: 10,
    backgroundColor: '#fff',
    color: '#424242',
  },
});
export default SearchScreen;
