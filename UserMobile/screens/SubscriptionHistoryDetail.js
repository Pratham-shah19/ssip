import {View, Text, Image, Pressable, Modal} from 'react-native';
import React, {useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
// import {useAuthContext} from '../src/Context/AuthContext';
import {useAuthContext} from '../src/Context/AuthContext';
import SubscriptionHistory from './SubscriptionHistory';

const SubscriptionHistoryDetail = ({dish}) => {
  const {tokens} = useAuthContext();
  const [modal, setModal] = useState(false);
  const [star1, setStar1] = useState(false);
  const [star2, setStar2] = useState(false);
  const [star3, setStar3] = useState(false);
  const [star4, setStar4] = useState(false);
  const [star5, setStar5] = useState(false);

  const star1Pressed = () => {
    setStar1(true);
    setStar2(false);
    setStar3(false);
    setStar4(false);
    setStar5(false);
  };
  const star2Pressed = () => {
    setStar1(true);
    setStar2(true);
    setStar3(false);
    setStar4(false);
    setStar5(false);
  };
  const star3Pressed = () => {
    setStar1(true);
    setStar2(true);
    setStar3(true);
    setStar4(false);
    setStar5(false);
  };
  const star4Pressed = () => {
    setStar1(true);
    setStar2(true);
    setStar3(true);
    setStar4(true);
    setStar5(false);
  };
  const star5Pressed = () => {
    setStar1(true);
    setStar2(true);
    setStar3(true);
    setStar4(true);
    setStar5(true);
  };
  const onPress = async () => {
    let star;
    if (star5) {
      star = 5;
    } else if (star4) {
      star = 4;
    } else if (star3) {
      star = 3;
    } else if (star2) {
      star = 2;
    } else if (star1) {
      star = 1;
    }
    const response = await axios.post(
      'http://65.0.189.107:8000/api/v1/user/dishes/rating',
      {dishId: dish.dish._id, rating: star},
      {headers: {Authorization: `Bearer ${tokens}`}},
    );
    setModal(!modal);
    setStar1(false);
    setStar2(false);
    setStar3(false);
    setStar4(false);
    setStar5(false);
  };
  return (
    <View style={{flexDirection: 'row', alignItems: 'center', padding: 10}}>
      <View style={{flex: 1}}>
        <Image
          source={{uri: dish?.dish?.imageUrl}}
          style={{height: 40, width: 40, borderRadius: 20}}
        />
      </View>
      <View style={{flex: 5}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{color: 'black', fontFamily: 'Fredoka-Regular'}}>
            {dish?.dish?.name}
          </Text>
          <Text style={{fontSize: 12, color: 'black'}}>
            {' '}
            (Rs.{dish?.dish?.price * 30})
          </Text>
        </View>
        <View>
          <Text style={{color: 'grey', fontFamily: 'Fredoka-Regular'}}>
            {dish?.dish?.category}
          </Text>
        </View>
        <View>
          <Text style={{color: 'grey', fontFamily: 'Fredoka-Regular'}}>
            {dish?.subscription_id}
          </Text>
        </View>
      </View>
      <Pressable
        style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
        onPress={() => setModal(true)}>
        {/* // onPress={() => console.log()}> */}
        <Text
          style={{
            color: 'black',
            fontFamily: 'Fredoka-Regular',
            marginBottom: 12,
          }}>
          Rate
        </Text>
      </Pressable>
      <Modal
        animationType="none"
        transparent={true}
        visible={modal}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModal(!modal);
        }}>
        <View style={{flex: 1}}>
          <Pressable
            style={{
              flex: 1,
              height: '25%',
              backgroundColor: 'rgba(0,0,0,0.3)',
            }}
            onPress={() => setModal(!modal)}></Pressable>
          <View
            style={{
              height: '30%',
              backgroundColor: 'rgba(0,0,0,0.3)',
            }}>
            <View
              style={{
                margin: 20,
                height: '90%',
                backgroundColor: 'white',
                borderRadius: 20,
                padding: 35,
                alignItems: 'center',
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 5,
              }}>
              <Text
                style={{
                  color: 'black',
                  fontFamily: 'Fredoka-Regular',
                  fontSize: 16,
                }}>
                Rate
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 25,
                }}>
                <Pressable onPress={star1Pressed}>
                  <FontAwesome
                    name={star1 ? 'star' : 'star-o'}
                    size={30}
                    color={star1 ? 'orange' : 'black'}
                    style={{marginRight: 7}}
                  />
                </Pressable>
                <Pressable onPress={star2Pressed}>
                  <FontAwesome
                    name={star2 ? 'star' : 'star-o'}
                    size={30}
                    color={star2 ? 'orange' : 'black'}
                    style={{marginRight: 7}}
                  />
                </Pressable>
                <Pressable onPress={star3Pressed}>
                  <FontAwesome
                    name={star3 ? 'star' : 'star-o'}
                    size={30}
                    color={star3 ? 'orange' : 'black'}
                    style={{marginRight: 7}}
                  />
                </Pressable>
                <Pressable onPress={star4Pressed}>
                  <FontAwesome
                    name={star4 ? 'star' : 'star-o'}
                    size={30}
                    color={star4 ? 'orange' : 'black'}
                    style={{marginRight: 7}}
                  />
                </Pressable>
                <Pressable onPress={star5Pressed}>
                  <FontAwesome
                    name={star5 ? 'star' : 'star-o'}
                    size={30}
                    color={star5 ? 'orange' : 'black'}
                    style={{marginRight: 7}}
                  />
                </Pressable>
              </View>
              <Pressable
                onPress={onPress}
                style={{
                  backgroundColor: '#f35858',
                  padding: 6,
                  borderRadius: 4,
                  marginTop: 16,
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontFamily: 'Fredoka-Regular',
                    fontSize: 16,
                  }}>
                  Submit
                </Text>
              </Pressable>
            </View>
          </View>
          <Pressable
            style={{
              flex: 1,
              height: '30%',
              backgroundColor: 'rgba(0,0,0,0.3)',
            }}
            onPress={() => setModal(!modal)}></Pressable>
        </View>
      </Modal>
    </View>
  );
};

export default SubscriptionHistoryDetail;
