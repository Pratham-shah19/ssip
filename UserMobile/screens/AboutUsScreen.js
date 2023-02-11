import {
  View,
  Text,
  Image,
  Pressable,
  TouchableOpacity,
  Linking,
  ScrollView,
} from 'react-native';
import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AboutUsScreen = () => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        backgroundColor: 'white',
        flex: 1,
        padding: 14,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 10,
        }}>
        <FontAwesome5
          name="users"
          size={17}
          color={'#000000'}
          style={{marginRight: 3}}
        />
        <Text
          style={{
            marginLeft: 3,
            fontFamily: 'Fredoka-Medium',
            color: '#000000',
            fontSize: 17,
            marginTop: 3,
            // marginBottom: 10,
          }}>
          About Us
        </Text>
      </View>
      <View
        style={{
          margin: 10,
          borderRadius: 25,
          backgroundColor: 'white',
          height: 415,
          width: 312,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.29,
          shadowRadius: 4.65,
          elevation: 7,
        }}>
        <Image
          source={require('./../data/Het.jpg')}
          style={{
            height: 310,
            width: 312,
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
          }}
        />
        <Text
          style={{
            // marginLeft: 3,
            fontFamily: 'Fredoka-Medium',
            color: '#000000',
            fontSize: 16,
            marginTop: 7,
            textAlign: 'center',
          }}>
          Het Patel
        </Text>
        <Text
          style={{
            // marginLeft: 3,
            fontFamily: 'Fredoka-Regular',
            color: '#000000',
            fontSize: 14,
            marginTop: 4,
            textAlign: 'center',
          }}>
          App & AWS Developer
        </Text>
        <View
          style={{
            marginTop: 13,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL(
                'https://www.linkedin.com/in/het-patel-462236201/',
              )
            }>
            <FontAwesome name="linkedin" size={18} color={'#0077b5'} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => Linking.openURL(`mailto:hetpatel5542@gmail.com`)}>
            <Ionicons name="ios-mail" size={18} color={'#ea4335'} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => Linking.openURL('https://wa.me/917698545581')}>
            <FontAwesome name="whatsapp" size={20} color={'#59ce72'} />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          margin: 10,
          marginTop: 15,
          borderRadius: 25,
          backgroundColor: 'white',
          height: 415,
          width: 312,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.29,
          shadowRadius: 4.65,
          elevation: 7,
        }}>
        <Image
          source={require('./../data/Pratham.jpg')}
          style={{
            height: 310,
            width: 312,
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
          }}
        />
        <Text
          style={{
            // marginLeft: 3,
            fontFamily: 'Fredoka-Medium',
            color: '#000000',
            fontSize: 16,
            marginTop: 7,
            textAlign: 'center',
          }}>
          Pratham Shah
        </Text>
        <Text
          style={{
            // marginLeft: 3,
            fontFamily: 'Fredoka-Regular',
            color: '#000000',
            fontSize: 14,
            marginTop: 4,
            textAlign: 'center',
          }}>
          Backend Developer
        </Text>
        <View
          style={{
            marginTop: 13,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL(
                'https://www.linkedin.com/in/pratham-shah-269a93205/',
              )
            }>
            <FontAwesome name="linkedin" size={18} color={'#0077b5'} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => Linking.openURL(`mailto:prathamshah019@gmail.com`)}>
            <Ionicons name="ios-mail" size={18} color={'#ea4335'} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => Linking.openURL('https://wa.me/918200470050')}>
            <FontAwesome name="whatsapp" size={20} color={'#59ce72'} />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          margin: 10,
          marginTop: 15,
          borderRadius: 25,
          backgroundColor: 'white',
          height: 400,
          width: 312,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.29,
          shadowRadius: 4.65,
          elevation: 7,
          marginBottom: 40,
        }}>
        <Image
          source={require('./../data/Kandarp.jpg')}
          style={{
            height: 300,
            width: 312,
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
          }}
        />
        <Text
          style={{
            // marginLeft: 3,
            fontFamily: 'Fredoka-Medium',
            color: '#000000',
            fontSize: 16,
            marginTop: 7,
            textAlign: 'center',
          }}>
          Kandarp Shah
        </Text>
        <Text
          style={{
            // marginLeft: 3,
            fontFamily: 'Fredoka-Regular',
            color: '#000000',
            fontSize: 14,
            marginTop: 4,
            textAlign: 'center',
          }}>
          Backend Developer
        </Text>
        <View
          style={{
            marginTop: 13,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL(
                'https://www.linkedin.com/in/kandarp-shah-88b732196/',
              )
            }>
            <FontAwesome name="linkedin" size={18} color={'#0077b5'} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => Linking.openURL(`mailto:shahkandarp24@gmail.com`)}>
            <Ionicons name="ios-mail" size={18} color={'#ea4335'} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => Linking.openURL('https://wa.me/917016763640')}>
            <FontAwesome name="whatsapp" size={20} color={'#59ce72'} />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default AboutUsScreen;
