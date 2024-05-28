import React, {useState} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  ActivityIndicator,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {useFocusEffect} from '@react-navigation/native';

import {Theme} from '../../../Theme/Theme';
import {Logo} from '../../../assets/components/Logo';
import {LargeHeading, SmallHeading} from '../../../assets/components/Heading';

import {ServiceRenderItem} from '../../../assets/components/ServiceRenderItem';

interface ScreenProps {
  navigation: NativeStackNavigationProp<any>;
}

const Cart: React.FC<ScreenProps> = ({navigation}) => {
  const [cartData, setCartData] = useState([]);
  const [showActivityIndicator, setShowActivityIndicator] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      const handleGetUserCartItems = async () => {
        setShowActivityIndicator(true);
        const cartItems = await firestore()
          .collection('CART')
          .where('emailID', '==', auth().currentUser?.email)
          .get();
        const serviceItems = await firestore().collection('SERVICES').get();
        setCartData(
          cartItems.docs.map(k => {
            return {
              bookingData: k,
              serviceData: serviceItems.docs.filter(
                f => f.id === k['_data'].serviceID,
              )[0],
            };
          }),
        );
        setShowActivityIndicator(false);
      };
      handleGetUserCartItems();
    }, []),
  );

  const renderItem = ({item}) => {
    return (
      <ServiceRenderItem
        showPrice
        item={item.serviceData['_data']}
        onPress={() =>
          navigation.navigate('ServiceDetail', {
            item: item,
            path: 'cart',
          })
        }>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <SmallHeading color={Theme.colors.red}>Read More</SmallHeading>
          {/* <SmallHeading
            onPress={() => {s
              console.log('removed Item');
            }}
            color={Theme.colors.red}>
            Remove From Cart
          </SmallHeading> */}
        </View>
      </ServiceRenderItem>
    );
  };

  return (
    <FlatList
      data={cartData}
      stickyHeaderIndices={[0]}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={() => {
        return (
          <View>
            <Logo />
            <View style={styles.headingWrapper}>
              <LargeHeading>Services In Your Cart</LargeHeading>
            </View>
          </View>
        );
      }}
      contentContainerStyle={styles.mainContentContainerStyle}
      style={styles.mainContainer}
      ItemSeparatorComponent={<View style={styles.margin} />}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={() => {
        return (
          <View style={styles.activityIndicatorWrapper}>
            {showActivityIndicator && (
              <ActivityIndicator color="white" size="small" />
            )}
            <Text style={styles.messageText}>
              {showActivityIndicator ? 'Fetching Cart Data' : 'No Data to Show'}
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
  mainContentContainerStyle: {
    backgroundColor: Theme.colors.background,
    paddingBottom: 50,
  },

  margin: {
    height: 10,
  },
  headingWrapper: {
    padding: 15,
    backgroundColor: Theme.colors.background,
  },
  activityIndicatorWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
  messageText: {
    color: 'white',
    fontSize: 12,
    fontFamily: Theme.fontFamily.Inter.regular,
    textAlign: 'center',
    marginTop: 10,
  },
});

export default Cart;
