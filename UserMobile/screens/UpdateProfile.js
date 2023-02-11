import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
  useWindowDimensions,
  TextInput,
  Pressable,
} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {useForm} from 'react-hook-form';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
// import AppLoader from '../../components/AppLoader';
import AppLoader from '../components/AppLoader';
import {useAuthContext} from '../src/Context/AuthContext';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const UpdateProfile = () => {
  const {height} = useWindowDimensions();
  const {users, tokens} = useAuthContext();
  const {control, handleSubmit, watch} = useForm();
  const pwd = watch('password');
  const navigation = useNavigation();
  const [loadingPending, setLoadingPending] = useState(false);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    getUserData();
  }, []);
  const getUserData = async data => {
    {
      try {
        setLoadingPending(true);
        const response = await axios.get(
          `http://65.0.189.107:8000/api/v1/user/${users}`,
          {
            headers: {
              Authorization: `Bearer ${tokens}`,
            },
          },
        );
        setName(response.data.data.name);
        setAddress(response.data.data.address);
        setLoadingPending(false);
      } catch (err) {
        setLoadingPending(false);
        Alert.alert(err);
      }
    }
  };
  const onUpdatePressed = async data => {
    {
      try {
        setLoadingPending(true);
        const response = await axios.post(
          `http://65.0.189.107:8000/api/v1/user/${users}`,
          {
            name: name,
            address: address,
          },
          {
            headers: {
              Authorization: `Bearer ${tokens}`,
            },
          },
        );
        const obj = {
          token: tokens,
          userID: users,
          name: name,
        };
        const jsonValue = JSON.stringify(obj);
        await AsyncStorage.setItem('userDetail', jsonValue);
        navigation.navigate('ProfileScreen');
        setLoadingPending(false);
      } catch (err) {
        setLoadingPending(false);
        Alert.alert(err);
      }
    }
  };
  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{backgroundColor: 'white', flex: 1, padding: 14}}>
        <View style={styles.root}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <FontAwesome5
              name="user-edit"
              size={15}
              color={'#000000'}
              style={{marginRight: 3}}
            />
            <Text
              style={{
                marginLeft: 3,
                color: '#000000',
                fontFamily: 'Fredoka-Regular',
                fontSize: 16,
              }}>
              Update Your Profile
            </Text>
          </View>

          <Text
            style={{
              color: 'black',
              fontSize: 14,
              fontFamily: 'Fredoka-Regular',
              marginTop: 15,
            }}>
            Name:
          </Text>
          <TextInput
            onChangeText={setName}
            value={name}
            style={{
              height: 36,
              borderWidth: 0.5,
              borderColor: '#d1cfcf',
              marginTop: 5,
              borderRadius: 8,
              paddingHorizontal: 10,
              fontSize: 13,
              fontFamily: 'Fredoka-Regular',
              color: 'black',
              marginBottom: 10,
            }}
          />
          <Text
            style={{
              color: 'black',
              fontSize: 14,
              fontFamily: 'Fredoka-Regular',
            }}>
            Address:
          </Text>
          <TextInput
            onChangeText={setAddress}
            value={address}
            style={{
              height: 36,
              borderWidth: 0.5,
              borderColor: '#d1cfcf',
              marginTop: 5,
              borderRadius: 8,
              paddingHorizontal: 10,
              fontSize: 13,
              fontFamily: 'Fredoka-Regular',
              color: 'black',
              marginBottom: 10,
            }}
          />
          <Pressable
            onPress={onUpdatePressed}
            style={{
              alignContent: 'center',
              alignSelf: 'center',
              marginTop: 10,
              backgroundColor: '#f35858',
              paddingVertical: 12,
              borderRadius: 9,
            }}>
            <Text
              style={{
                color: 'white',
                fontFamily: 'Fredoka-Medium',
                marginHorizontal: 120,
                fontSize: 15,
              }}>
              Update
            </Text>
          </Pressable>
        </View>
      </ScrollView>
      {loadingPending ? <AppLoader /> : null}
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    padding: 10,
  },
  title: {
    fontSize: 18,
    color: 'black',
    fontFamily: 'Fredoka-Medium',
    textAlign: 'center',
    marginBottom: 10,
  },
  text: {
    color: 'gray',
    marginTop: 10,
    fontFamily: 'Fredoka-Regular',
    fontSize: 12,
  },
  link: {
    color: '#FDB075',
  },
  logo: {
    width: 260,
    maxWidth: 260,
    maxHeight: 260,
    alignSelf: 'center',
  },
});

export default UpdateProfile;
