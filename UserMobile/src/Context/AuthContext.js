import {View, Text} from 'react-native';
import React, {useEffect, useState, createContext, useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const AuthContext = createContext({});

const AuthContextProvider = ({children}) => {
  const [dbUser, setDbUser] = useState(null);
  const [user, setUser] = useState(false);
  const [tokens, setTokens] = useState(null);
  const [users, setUsers] = useState(null);
  const [dish, setDish] = useState([]);
  const [price, setPrice] = useState(null);
  let jsonValue;

  useEffect(() => {
    getData();
    console.log('in context');
    setTimeout(() => console.log('h'), 1000);
    setTimeout(() => console.log(jsonValue?.token), 1);
  }, []);

  const getData = async () => {
    console.log('inside get auth');
    const value = await AsyncStorage.getItem('userDetail');
    jsonValue = JSON.parse(value);
    if (value != null) {
      console.log('user in auth context:', jsonValue);
      setUser(true);
      setUsers(jsonValue?.userID);
      setTokens(jsonValue?.token);
      setDbUser(jsonValue);
    } else {
      setUser(false);
      // jsonValue = '';
    }
  };

  const onCreateOrder = async () => {
    const response = await axios.get(
      `http://10.0.2.2:8000/api/v1/user/${users}/cart`,
      {
        headers: {
          Authorization: `Bearer ${tokens}`,
        },
      },
    );
    setDish(response.data.data.data);
    setPrice(response.data.data.price);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        dbUser,
        tokens,
        users,
        setTokens,
        jsonValue,
        getData,
        onCreateOrder,
        dish,
        price,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const useAuthContext = () => useContext(AuthContext);
