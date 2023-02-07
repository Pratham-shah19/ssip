import React, {useRef, useState, useEffect} from 'react';
import {FlatList} from 'react-native';
// import Carousel, {ParallaxImage} from 'react-native-snap-carousel';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Image,
  ScrollView,
} from 'react-native';
import ImageCarouselData from '../../data/ImageCarouselData';
// import {ScrollView} from 'react-native-gesture-handler';

const {width: screenWidth} = Dimensions.get('window');

const ImageCarousel = props => {
  const [entries, setEntries] = useState([]);
  const carouselRef = useRef(null);

  // const goForward = () => {
  //   carouselRef.current.snapToNext();
  // };

  // useEffect(() => {
  //   setEntries(ImageCarouselData);
  // }, []);

  // const renderItem = ({item, index}, parallaxProps) => {
  //   return (
  //     <View style={styles.item}>
  //       <ParallaxImage
  //         source={{uri: item.illustration}}
  //         containerStyle={styles.imageContainer}
  //         style={styles.image}
  //         parallaxFactor={0.4}
  //         {...parallaxProps}
  //       />
  //     </View>
  //   );
  // };

  return (
    <View style={{backgroundColor: 'white'}}>
      <View style={{flexDirection: 'row', alignItems: 'center', padding: 15}}>
        <Text
          style={{
            color: 'black',
            fontSize: 19,
            fontFamily: 'Fredoka-Medium',
          }}>
          Today's Special Deals {} 🎉
        </Text>
      </View>
      <View style={styles.container}>
        <ScrollView
          style={{paddingHorizontal: 7, marginBottom: 8}}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          pagingEnabled={true}>
          {/* <FlatList
            data={ImageCarouselData}
            renderItem={({item}) => {
              <Image
                style={{width: 100, height: 100}}
                source={{uri: item.illustration}}
              />;
            }}
          /> */}
          <Image
            source={{
              uri: 'https://cdn.pixabay.com/photo/2020/05/17/04/22/pizza-5179939_1280.jpg',
            }}
            style={{width: 300, height: 200, borderRadius: 10, margin: 10}}
          />
          <Image
            source={{
              uri: 'https://gumlet.assettype.com/swarajya%2F2016-03%2Fa1431a1b-fd5e-4ec8-ae83-95753bb4c2bd%2Fdosa.jpg?w=1200&auto=format%2Ccompress&ogImage=true',
            }}
            style={{width: 300, height: 200, borderRadius: 10, margin: 10}}
          />
          <Image
            source={{
              uri: 'https://www.eatthis.com/wp-content/uploads/sites/4/2021/07/mcdonalds-burgers-fries.jpg?quality=82&strip=1&resize=640%2C360',
            }}
            style={{width: 300, height: 200, borderRadius: 10, margin: 10}}
          />
          <Image
            source={{
              uri: 'https://www.jagannathskitchen.in/images/placeholder.jpg',
            }}
            style={{width: 300, height: 200, borderRadius: 10, margin: 10}}
          />
          <Image
            source={{
              uri: 'https://cdn.pixabay.com/photo/2020/05/17/04/22/pizza-5179939_1280.jpg',
            }}
            style={{width: 300, height: 200, borderRadius: 10, margin: 10}}
          />
          <Image
            source={{
              uri: 'https://cdn.pixabay.com/photo/2020/05/17/04/22/pizza-5179939_1280.jpg',
            }}
            style={{width: 300, height: 200, borderRadius: 10, margin: 10}}
          />
        </ScrollView>
        {/* <Carousel
          ref={carouselRef}
          sliderWidth={screenWidth}
          sliderHeight={screenWidth}
          itemWidth={screenWidth - 60}
          data={entries}
          renderItem={renderItem}
          hasParallaxImages={true}
        /> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 5,
  },
  item: {
    width: screenWidth - 60,
    height: screenWidth - 160,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ios: 0, android: 1}),
    backgroundColor: 'white',
    borderRadius: 20,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
});

export default ImageCarousel;
