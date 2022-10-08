import {View, Text} from 'react-native';
import React, {useEffect, useState, createContext, useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext({});

const AuthContextProvider = ({children}) => {
  // const [authStudent, setAuthStudent] = useState(null);
  const [dbUser, setDbUser] = useState(null);
  // const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(false);
  const [tokens, setTokens] = useState(null);
  const [users, setUsers] = useState(null);
  const token = dbUser?.token;
  //   const sub = authStudent?.attributes?.sub;
  //   const id = dbStudent?.id;

  //   useEffect(() => {
  //     Auth.currentAuthenticatedUser({bypassCache: true}).then(setAuthStudent);
  //   }, []);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const value = await AsyncStorage.getItem('userDetail');
    const jsonValue = JSON.parse(value);
    // if (value != null) {
    console.log('user in auth context:', jsonValue);
    setUser(true);
    setUsers(jsonValue.userID);
    setTokens(jsonValue.token);
    setDbUser(jsonValue);

    // } else {
    // setUser(false);
    // }
  };
  //   useEffect(() => {
  //     // if (!sub) {
  //     //   return;
  //     // }
  //     DataStore.query(Student, student => student.sub('eq', sub)).then(
  //       students => {
  //         setDbStudent(students[0]);
  //         setLoading(false);
  //       },
  //     );
  //   }, [sub]);

  //   useEffect(() => {
  //     if (!dbStudent) {
  //       return;
  //     }
  //     const subscription = DataStore.observe(Student, dbStudent.id).subscribe(
  //       msg => {
  //         if (msg.opType === 'UPDATE') {
  //           setDbStudent(msg.element);
  //         }
  //       },
  //     );

  //     return () => subscription.unsubscribe();
  //   }, [dbStudent]);

  return (
    <AuthContext.Provider value={{user, setUser, dbUser, token, tokens, users}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const useAuthContext = () => useContext(AuthContext);
