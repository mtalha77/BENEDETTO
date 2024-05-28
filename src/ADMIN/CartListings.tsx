import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';

import {Theme} from '../Theme/Theme';
import {Logo} from '../assets/components/Logo';
import {width} from '../Theme/Dimensions';
import auth from '@react-native-firebase/auth';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import RenderItem from './RenderItem';

interface ScreenProps {
  navigation: NativeStackNavigationProp<any>;
}

const CartListings: React.FC<ScreenProps> = ({navigation}) => {
  const [data, setData] = useState([]);
  const [showActivity, setShowActivity] = useState(false);

  useEffect(() => {
    setShowActivity(true);
    const subscribe = firestore()
      .collection('CART')
      .onSnapshot(bookings => {
        setData(bookings.docs);
        setShowActivity(false);
      });
    return () => subscribe();
  }, []);

  return (
    <FlatList
      data={data}
      style={styles.mainContainer}
      stickyHeaderIndices={[0]}
      ListHeaderComponent={() => {
        return (
          <View>
            <Logo />
            <TouchableOpacity
              onPress={async () => {
                await auth().signOut();
                navigation.replace('Login');
              }}
              style={styles.logoutButtonContainer}>
              <Text style={styles.logoutButtonTag}>Logout</Text>
            </TouchableOpacity>
            <Text
              style={{
                color: 'white',
                fontFamily: Theme.fontFamily.Inter.medium,
                fontSize: 18,
                padding: 10,
                backgroundColor: Theme.colors.background,
              }}>
              Client Bookings
            </Text>
          </View>
        );
      }}
      renderItem={({item, index}) => {
        return <RenderItem item={item} />;
      }}
      ListEmptyComponent={() => {
        return (
          <View
            style={{
              marginTop: 40,
            }}>
            {showActivity && <ActivityIndicator size="large" color="white" />}
            <Text
              style={{
                color: 'white',
                textAlign: 'center',
                marginTop: 10,
                fontFamily: Theme.fontFamily.Inter.semiBold,
              }}>
              {showActivity ? 'Fetching data...' : 'No data to show'}
            </Text>
          </View>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  logoutButtonContainer: {
    position: 'absolute',
    alignSelf: 'center',
    backgroundColor: 'white',
    right: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    top: 40,
  },
  logoutButtonTag: {
    color: 'black',
    fontFamily: Theme.fontFamily.Inter.semiBold,
  },
});

export default CartListings;
