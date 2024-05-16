import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import LinearGradient from 'react-native-linear-gradient';

import AntDesign from 'react-native-vector-icons/AntDesign';

import {Logo} from '../../../assets/components/Logo';
import {Theme} from '../../../Theme/Theme';

import {width} from '../../../Theme/Dimensions';
import {LargeHeading} from '../../../assets/components/Heading';
import {Description} from '../../../assets/components/Description';
import {Button} from '../../../assets/components/Button';

interface ScreenProps {
  navigation: NativeStackNavigationProp<any>;
  route: any;
}

const ServiceDetail: React.FC<ScreenProps> = ({navigation, route}) => {
  const {item, wish} = route.params;

  const [interested, setInterested] = useState(wish);
  return (
    <View style={styles.mainContaier}>
      <Logo back={() => navigation.goBack()} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.mainContaier}>
        <ImageBackground
          source={item.img}
          resizeMode="cover"
          style={styles.image}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 0, y: 1}}
            colors={['transparent', 'transparent', Theme.colors.background]}
            style={{
              flex: 1,
            }}
          />
        </ImageBackground>
        <View
          style={{
            padding: 15,
          }}>
          <LargeHeading>{item.title}</LargeHeading>
          <View style={styles.row}>
            <AntDesign name="star" color="white" size={12} />
            <Text style={styles.rating}>5</Text>
            <Description size={10}>(31 Reviews)</Description>
          </View>
          <Description size={12}>
            {item.description}
            {item.description}
            {item.description}
            {item.description}
            {item.description}
          </Description>
          <View style={[styles.row, styles.priceWrapper]}>
            <Text style={styles.price}>Total Price</Text>
            <Text style={styles.price}>$1000</Text>
          </View>
        </View>
        <View style={styles.bottomButtonRowWrapper}>
          <TouchableOpacity
            onPress={() => setInterested(!interested)}
            activeOpacity={0.8}
            style={[styles.heartWrapper, interested && styles.heartSelected]}>
            <AntDesign
              name={interested ? 'heart' : 'hearto'}
              color="white"
              size={26}
            />
          </TouchableOpacity>
          <Button>Book Now</Button>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContaier: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  image: {
    width: width - 20,
    height: 190,
    alignSelf: 'center',
    borderRadius: 5,
    overflow: 'hidden',
    marginVertical: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  rating: {
    fontSize: 10,
    color: 'white',
    fontFamily: Theme.fontFamily.Inter.semiBold,
    marginHorizontal: 5,
  },
  priceWrapper: {
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 0,
  },
  price: {
    fontSize: 14,
    color: 'white',
    fontFamily: Theme.fontFamily.Inter.semiBold,
  },
  bottomButtonRowWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heartWrapper: {
    marginLeft: 15,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10,
  },
  heartSelected: {
    borderWidth: 0,
  },
});

export default ServiceDetail;
