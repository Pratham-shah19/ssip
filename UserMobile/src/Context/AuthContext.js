import {View, Text} from 'react-native';
import React, {useEffect, useState, createContext, useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import AppLoader from '../../components/AppLoader';

const AuthContext = createContext({});

const AuthContextProvider = ({children}) => {
  const [dbUser, setDbUser] = useState(null);
  const [user, setUser] = useState(false);
  const [tokens, setTokens] = useState(null);
  const [users, setUsers] = useState(null);
  const [dish, setDish] = useState([]);
  const [price, setPrice] = useState(null);
  const [items, setItems] = useState([]);
  const [name, setName] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loginPending, setLoginPending] = useState(false);
  let jsonValue;
  let favourite;
  useEffect(() => {
    getData();
    // console.log('in context');
    // // getItem();
    // setTimeout(() => console.log('h'), 1000);
    // setTimeout(() => console.log(jsonValue?.token), 1);
  }, []);

  const getData = async () => {
    // console.log('inside get auth');
    setLoginPending(true);
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
    setLoginPending(false);
  };

  const onCreateOrder = async () => {
    setLoginPending(true);
    const response = await axios.get(
      `http://65.0.189.107:8000/api/v1/user/${users}/cart`,
      {
        headers: {
          Authorization: `Bearer ${tokens}`,
        },
      },
    );
    setDish(response.data.data.data);
    setPrice(response.data.data.price);
    setLoginPending(false);
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
        items,
        setItems,
        // getItem,
        // setItem,
        loginPending,
        setLoginPending,
        name,
        setName,
        setUserId,
        userId,
      }}>
      {children}
      {loginPending ? <AppLoader /> : null}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const useAuthContext = () => useContext(AuthContext);
