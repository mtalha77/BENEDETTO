import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import firestore from '@react-native-firebase/firestore';

import {width} from '../Theme/Dimensions';
import {Theme} from '../Theme/Theme';
import auth from '@react-native-firebase/auth';

interface RowFieldProps {
  title: string;
  children: string;
}

const RowField = ({title, children}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderColor: 'grey',
        paddingVertical: 5,
      }}>
      <Text
        style={{
          color: 'grey',
          fontSize: 14,
          fontFamily: Theme.fontFamily.Inter.regular,
        }}>
        {title}
      </Text>
      <Text
        style={{
          color: 'white',
          fontSize: 14,
          fontFamily: Theme.fontFamily.Inter.medium,
        }}>
        {children}
      </Text>
    </View>
  );
};

const RenderItem = ({item, index}) => {
  const [serviceTitle, setServiceTitle] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [load, setLoad] = useState(false);

  useEffect(() => {
    handleGetAboutUser();
  }, []);

  const handleGetAboutUser = async () => {
    try {
      const service = await firestore()
        .collection('SERVICES')
        .doc(item['_data'].serviceID)
        .get();

      const user = await firestore()
        .collection('USERS')
        .doc(item['_data'].emailID)
        .get();

      setServiceTitle(service.data()['title']);
      setCustomerName(user.data()['displayName']);
    } catch (error) {
      console.log(error);
    }
  };

  const markBookingCompleted = async () => {
    try {
      setLoad(true);

      const historyInstance = await firestore()
        .collection('HISTORY')
        .doc(item['_data'].emailID)
        .get();

      if (historyInstance.exists) {
        await firestore()
          .collection('HISTORY')
          .doc(item['_data'].emailID)
          .update({
            bookings: firestore.FieldValue.arrayUnion({
              serviceID: item['_data'].serviceID,
              date: item['_data'].date,
              time: item['_data'].time,
            }),
          });
        await firestore().collection('CART').doc(item.id).delete();
      } else {
        await firestore()
          .collection('HISTORY')
          .doc(item['_data'].emailID)
          .set({
            bookings: firestore.FieldValue.arrayUnion({
              serviceID: item['_data'].serviceID,
              date: item['_data'].date,
              time: item['_data'].time,
            }),
          });
        await firestore().collection('CART').doc(item.id).delete();
      }

      setLoad(false);
    } catch (error) {
      console.error('Error marking booking completed:', error);
    }
  };

  return (
    <View style={styles.itemContainer}>
      <Text style={styles.itemTitle}>{serviceTitle}</Text>
      <RowField title="Customer Name">{customerName}</RowField>
      <RowField title="Date">{item['_data'].date}</RowField>
      <RowField title="Time">{item['_data'].time}</RowField>
      <TouchableOpacity
        onPress={markBookingCompleted}
        disabled={load}
        style={{
          backgroundColor: load ? 'grey' : 'green',
          alignSelf: 'flex-end',
          marginTop: 14,
          borderRadius: 5,
          height: 30,
          alignItems: 'center',
          justifyContent: 'center',
          width: 110,
        }}>
        {load ? (
          <ActivityIndicator color="white" size={'small'} />
        ) : (
          <Text
            style={{
              color: 'white',
            }}>
            Complete
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    width: width - 20,
    alignSelf: 'center',
    padding: 10,
    backgroundColor: 'black',
    marginVertical: 5,
    borderRadius: 10,
  },
  itemTitle: {
    color: 'white',
    fontFamily: Theme.fontFamily.Inter.regular,
    fontSize: 20,
    marginBottom: 15,
  },
});

export default RenderItem;
