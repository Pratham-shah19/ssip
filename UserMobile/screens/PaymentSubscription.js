import {
  View,
  Text,
  Touchable,
  Pressable,
  Image,
  Button,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useAuthContext} from '../src/Context/AuthContext';
import {useRoute} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {StripeProvider, useStripe} from '@stripe/stripe-react-native';
// import {ScrollView} from 'react-native-gesture-handler';

const PaymentSubscription = () => {
  const route = useRoute();
  const totalPrice = route?.params?.totalPrice;
  const dishId = route?.params?.dishId;
  const {tokens, users, name, userId} = useAuthContext();
  const [wallet, setWallet] = useState(null);
  useEffect(() => {
    // visible();
    walletDetail();
  }, []);
  const showToastWithGravityAndOffset = async () => {
    ToastAndroid.showWithGravityAndOffset(
      'Dish added to cart!',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
  };
  const navigation = useNavigation();
  const onCreateOrder = async () => {
    const response = await axios.post(
      `http://65.0.189.107:8000/api/v1/user/${users}/paysubscriptionwithwallet`,
      {dishId: dishId},
      {headers: {Authorization: `Bearer ${tokens}`}},
    );
    // navigation.navigate('OtpScreen', {otp: response.data.data.res});
    if (response.data.res == 'success') {
      await showToastWithGravityAndOffset();
      navigation.navigate('SubscriptionHistory');
    } else {
      navigation.navigate('StripePayment', {
        price: response.data.data,
        dishId: dishId,
      });
    }
    // console.log(response);
  };
  const walletDetail = async () => {
    const response = await axios.get(
      `http://65.0.189.107:8000/api/v1/user/${users}/wallet`,
      {headers: {Authorization: `Bearer ${tokens}`}},
    );
    // console.log(response.data.data);
    setWallet(response.data.data);
  };

  // const visible = async () => {
  //   const response = await axios.get(
  //     `http://65.0.189.107:8000/api/v1/user/${users}/payWallet`,
  //     {headers: {Authorization: `Bearer ${tokens}`}},
  //   );
  //   setVisibility(response.data.data);
  //   // console.log(visibility);
  // };
  const {initPaymentSheet, presentPaymentSheet} = useStripe();
  const [loading, setLoading] = useState(false);

  const fetchPaymentSheetParams = async () => {
    // console.log('id:', users);
    const response = await axios.post(
      `http://65.0.156.10:6990/api/v1/payments/payment-sheet`,
      {userId: users, price: totalPrice},
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    const {paymentIntent, ephemeralKey, customer} = await response.data;
    // console.log('response:', customer);
    return {
      paymentIntent,
      ephemeralKey,
      customer,
    };
  };
  const buySubscription = async () => {
    const response = await axios.post(
      `http://65.0.156.10:6990/api/v1/payments/${users}/place-online-order-subscription`,
      {dishId: dishId, paymentmode: 'ONLINE', amount: totalPrice},
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    // // console.log(response.data);
    // if (response.data.data.orderOtp) {
    //   navigation.navigate('OtpScreen', {otp: response.data.data.orderOtp});
    // } else {
    //   Alert.alert('Payment Unsuccessful');
    // }
    // console.log('response', response);
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
    await buySubscription();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      Alert.alert('Success', 'Your order is confirmed!');
    }
  };
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{backgroundColor: 'white'}}>
      <StripeProvider
        publishableKey="pk_live_51MaAAxSIA0Gt3R3f4zyYGLKj8bpt9tPGjgWtEFvSMoWM5Ry3Az6dL9PS5Uo2qCmD8IJC8cshW2FSp645SuB0Vm2p004sigxfg5"
        // urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
      >
        <View style={{backgroundColor: 'white', flex: 1}}>
          <View
            style={{
              alignContent: 'center',
              alignItems: 'center',
              marginTop: 20,
            }}>
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
              marginTop: 30,
            }}>
            <View style={{alignSelf: 'center'}}>
              <Ionicons
                name="wallet-outline"
                size={60}
                color={'#f35858'}
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
            <TouchableOpacity
              onPress={onCreateOrder}
              // disabled={!visibility}
              style={{
                alignContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                backgroundColor: '#f7442d',
                borderRadius: 8,
                paddingHorizontal: 15,
                paddingVertical: 8,
                marginTop: 10,
              }}>
              <Text
                style={{
                  color: 'white',
                  fontFamily: 'Fredoka-Medium',
                  fontSize: 17,
                }}>
                Pay from your Wallet
              </Text>
            </TouchableOpacity>
            <View
              style={{
                alignItems: 'center',
                alignSelf: 'center',
                marginTop: 15,
                opacity: 0,
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
            style={{
              alignContent: 'center',
              alignItems: 'center',
              marginTop: 25,
            }}>
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
            source={require('../data/stripepay.png')}
            style={{width: 170, height: 80, alignSelf: 'center', marginTop: 10}}
          />
          <View
            style={{paddingHorizontal: 30, marginTop: 15, borderRadius: 10}}>
            <Button
              variant="primary"
              disabled={!loading}
              title="Checkout"
              onPress={openPaymentSheet}
            />
          </View>
        </View>
      </StripeProvider>
    </ScrollView>
  );
};

export default PaymentSubscription;
