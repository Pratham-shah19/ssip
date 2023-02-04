import {View, Text, Touchable, Pressable, Image, Button} from 'react-native';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useAuthContext} from '../src/Context/AuthContext';
import {useRoute} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {StripeProvider, useStripe} from '@stripe/stripe-react-native';

const Payment = () => {
  const route = useRoute();
  const price = route?.params?.price;
  const {tokens, users, name} = useAuthContext();
  const [wallet, setWallet] = useState();
  const [visibility, setVisibility] = useState();
  useEffect(() => {
    visible();
    walletDetail();
  }, []);
  const navigation = useNavigation();
  const onCreateOrder = async () => {
    const response = await axios.post(
      `http://13.233.214.112:8000/api/v1/user/${users}/payWallet`,
      {price: price, canteenName: 'Sachivalaya'},
      {headers: {Authorization: `Bearer ${tokens}`}},
    );
    navigation.navigate('OtpScreen');
  };
  const walletDetail = async () => {
    const response = await axios.get(
      `http://13.233.214.112:8000/api/v1/user/${users}/wallet`,
      {headers: {Authorization: `Bearer ${tokens}`}},
    );
    // console.log(response.data.data);
    setWallet(response.data.data);
  };

  const visible = async () => {
    const response = await axios.get(
      `http://13.233.214.112:8000/api/v1/user/${users}/payWallet`,
      {headers: {Authorization: `Bearer ${tokens}`}},
    );
    setVisibility(response.data.data);
    console.log(visibility);
  };
  const {initPaymentSheet, presentPaymentSheet} = useStripe();
  const [loading, setLoading] = useState(false);

  const fetchPaymentSheetParams = async () => {
    // const response = await fetch(`http://10.0.2.2:6990/payment-sheet`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: {cus_id: ''},
    // });
    console.log('hello');
    const response = await axios.post(
      `http://13.234.116.208:6990/payment-sheet`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    const {paymentIntent, ephemeralKey, customer} = await response.data;
    console.log('response:', customer);
    return {
      paymentIntent,
      ephemeralKey,
      customer,
    };
  };

  const initializePaymentSheet = async () => {
    const {paymentIntent, ephemeralKey, customer, publishableKey} =
      await fetchPaymentSheetParams();

    const {error} = await initPaymentSheet({
      merchantDisplayName: 'Sachivalay',
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      allowsDelayedPaymentMethods: true,
      defaultBillingDetails: {
        name: name,
      },
    });
    if (!error) {
      setLoading(true);
    }
  };

  useEffect(() => {
    initializePaymentSheet();
  }, []);
  const openPaymentSheet = async () => {
    const {error} = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      Alert.alert('Success', 'Your order is confirmed!');
    }
  };
  return (
    <StripeProvider
      publishableKey="pk_test_51KyqwvSFXhJBixXADhCK7QcvopmkFSi5zg7i2wFLoGvFHYXNb2waPBALIHBoj6ONtR9mZMRAYAi5f5wurs14H1cL00mKeQfwrs"
      // urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
    >
      <View style={{backgroundColor: 'white', flex: 1}}>
        <View
          style={{alignContent: 'center', alignItems: 'center', marginTop: 20}}>
          <Text
            style={{
              fontSize: 22,
              color: 'black',
              fontFamily: 'Fredoka-Regular',
            }}>
            Payment Gateway
          </Text>
        </View>
        <View
          style={{
            alignContent: 'center',
            alignItems: 'center',
            marginTop: 40,
          }}>
          <View style={{alignSelf: 'center'}}>
            <Ionicons
              name="wallet-outline"
              size={80}
              color={visibility ? '#f35858' : 'grey'}
              style={{alignSelf: 'center'}}
            />
            <Text
              style={{
                alignSelf: 'center',
                fontSize: 17,
                color: 'black',
                fontFamily: 'Fredoka-Regular',
              }}>
              Current Balance: {'\u20B9'}
              {wallet}
            </Text>
          </View>
          <Pressable
            onPress={onCreateOrder}
            disabled={!visibility}
            style={{
              alignContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              backgroundColor: visibility ? '#f7442d' : 'grey',
              borderRadius: 8,
              paddingHorizontal: 15,
              paddingVertical: 8,
              marginTop: 10,
            }}>
            <Text
              style={{
                color: 'white',
                fontFamily: 'Fredoka-Medium',
                fontSize: 20,
              }}>
              Pay from your Wallet
            </Text>
          </Pressable>
          <View
            style={{
              alignItems: 'center',
              alignSelf: 'center',
              marginTop: 15,
              opacity: visibility ? 0 : 1,
            }}>
            <Text
              style={{
                color: 'red',
                fontSize: 15,
                fontFamily: 'Fredoka-Regular',
              }}>
              Your Balance is not sufficient
            </Text>
          </View>
        </View>
        <View
          style={{alignContent: 'center', alignItems: 'center', marginTop: 45}}>
          <Text style={{color: 'black'}}>----------</Text>
          <Text
            style={{
              fontFamily: 'Fredoka-Regular',
              color: 'black',
              fontSize: 25,
            }}>
            {''}OR{''}
          </Text>
          <Text style={{color: 'black'}}>----------</Text>
        </View>
        {/* )} */}
        <Image
          source={{
            uri: 'https://labourlawadvisor.in/blog/wp-content/uploads/2019/07/Horizontal-Thumbnail-7.jpg',
          }}
          style={{width: 300, height: 200, alignSelf: 'center'}}
        />
        <Button
          variant="primary"
          disabled={!loading}
          title="Checkout"
          onPress={openPaymentSheet}
        />
      </View>
    </StripeProvider>
  );
};

export default Payment;
