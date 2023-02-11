import {View, Text, Button, Alert, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import {StripeProvider, useStripe} from '@stripe/stripe-react-native';
import axios from 'axios';
import {useRoute} from '@react-navigation/native';
import {useAuthContext} from '../src/Context/AuthContext';
import {useNavigation} from '@react-navigation/native';
const StripePayment = () => {
  const {initPaymentSheet, presentPaymentSheet} = useStripe();
  const [loading, setLoading] = useState(false);
  const {users, name} = useAuthContext();
  const route = useRoute();
  const navigation = useNavigation();
  const price = route?.params?.price;
  const dishId = route?.params?.dishId;
  const fetchPaymentSheetParams = async () => {
    // console.log('id:', users);
    const response = await axios.post(
      `http://65.0.156.10:6990/api/v1/payments/payment-sheet`,
      {userId: users, price: price},
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
    console.log('dishId:', dishId);
    const response = await axios.post(
      `http://65.0.156.10:6990/api/v1/payments/${users}/place-online-order-subscription`,
      {dishId: dishId, paymentmode: 'KOT+ONLINE', amount: price},
      {},
    );
    console.log(response.data);
    if (response.data.res == 'success') {
      navigation.navigate('SubscriptionHistory');
    } else {
      Alert.alert('error');
    }
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
    <View>
      <StripeProvider
        publishableKey="pk_live_51MaAAxSIA0Gt3R3f4zyYGLKj8bpt9tPGjgWtEFvSMoWM5Ry3Az6dL9PS5Uo2qCmD8IJC8cshW2FSp645SuB0Vm2p004sigxfg5"
        // urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
      >
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
        <Image
          source={require('./../data/stripepay.png')}
          style={{width: 170, height: 80, alignSelf: 'center', marginTop: 10}}
        />
        <View style={{paddingHorizontal: 30, marginTop: 15, borderRadius: 10}}>
          <Button
            variant="primary"
            disabled={!loading}
            title="Checkout"
            onPress={openPaymentSheet}
          />
        </View>
      </StripeProvider>
    </View>
  );
};

export default StripePayment;
