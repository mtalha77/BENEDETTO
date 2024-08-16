import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  ActivityIndicator,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import {Theme} from '../../../Theme/Theme';
import {Logo} from '../../../assets/components/Logo';
import {SmallHeading} from '../../../assets/components/Heading';
import {CartRenderItem} from '../../../assets/components/ServiceRenderItem';

interface ScreenProps {
  navigation: NativeStackNavigationProp<any>;
}

const BookingHistory: React.FC<ScreenProps> = ({navigation}) => {
  const [data, setData] = useState([]);
  const [showActivityIndicator, setShowActivityIndicator] = useState(false);

  useEffect(() => {
    const handleGetHistory = async () => {
      try {
        setShowActivityIndicator(true);
        const history = await firestore()
          .collection('HISTORY')
          .where('emailID', '==', auth().currentUser?.email)
          .get();

        const serviceItems = await firestore().collection('SERVICES').get();
        setData(
          history.docs.map(k => {
            return {
              bookingData: k,
              serviceData: k._data.services.map(k => {
                return serviceItems.docs.filter(f => f.id === k)[0];
              }),
            };
          }),
        );
        setShowActivityIndicator(false);
      } catch (error) {
        setShowActivityIndicator(false);
      }
    };
    handleGetHistory();
  }, []);

  const renderItem = ({item}: any) => {
    return (
      <CartRenderItem
        showPrice
        item={item.serviceData}
        onPress={() => {
          navigation.navigate('BookingReciept', {
            item: item,
            thanks: false,
            isComplete: true,
          });
        }}>
        <SmallHeading color={'green'}>View Reciept</SmallHeading>
      </CartRenderItem>
    );
  };

  const listEmptyComponent = () => {
    return (
      <View style={styles.activityIndicatorWrapper}>
        {showActivityIndicator && (
          <ActivityIndicator color="white" size="small" />
        )}
        <Text style={styles.messageText}>
          {showActivityIndicator ? 'Fetching History Data' : 'No Data to Show'}
        </Text>
      </View>
    );
  };

  const itemSeparatorComponent = () => {
    return <View style={styles.margin} />;
  };

  return (
    <View style={styles.mainContainer}>
      <Logo back={() => navigation.goBack()}>Your Booking History</Logo>
      <FlatList
        data={data}
        contentContainerStyle={styles.mainContentContainerStyle}
        ItemSeparatorComponent={itemSeparatorComponent}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={listEmptyComponent}
      />
    </View>
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

export default BookingHistory;
