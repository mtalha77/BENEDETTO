import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import {Logo} from '../../../assets/components/Logo';
import {LargeHeading, SmallHeading} from '../../../assets/components/Heading';
import {Description} from '../../Auth/AuthComponents';
import {Theme} from '../../../Theme/Theme';
import {width} from '../../../Theme/Dimensions';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

interface RowFieldProps {
  children: string;
  prefix: string;
}

const RowField: React.FC<RowFieldProps> = ({prefix, children}) => {
  return (
    <View style={styles.rowFieldWrapper}>
      <SmallHeading size={12}>{prefix}:</SmallHeading>
      <Description color="white" size={10}>
        {children}
      </Description>
    </View>
  );
};

interface ScreenProps {
  navigation: NativeStackNavigationProp<any>;
  route: any;
}

const BookingReciept: React.FC<ScreenProps> = ({navigation, route}) => {
  const {item, thanks} = route.params;

  const [displayName, setDisplayName] = useState('');

  useEffect(() => {
    const handleGetUserProfile = async () => {
      if (auth().currentUser?.displayName === null) {
        const userData = await firestore()
          .collection('USERS')
          .doc(auth().currentUser?.email)
          .get();
        setDisplayName(userData['_data'].displayName);
      } else {
        setDisplayName(auth().currentUser?.displayName);
      }
    };
    handleGetUserProfile();
  }, []);

  return (
    <View style={styles.mainContainer}>
      <Logo back={() => navigation.goBack()}>
        {thanks
          ? 'Thank You For Booking Us!'
          : 'Your Booking Details Given Below'}
      </Logo>

      {thanks && (
        <>
          <Description color="white">
            {item.serviceData['_data'].shortDescription}
          </Description>
          <View style={styles.description}>
            <LargeHeading>Your Booking Details Given Below</LargeHeading>
          </View>
        </>
      )}
      <RowField prefix="Name">{displayName}</RowField>
      <RowField prefix="Service">{item.serviceData['_data'].title}</RowField>
      <RowField prefix="Date">
        {item?.bookingData['_data']?.timeStamp
          ? new Date(item?.bookingData['_data']?.timeStamp).toDateString()
          : new Date(item?.bookingData?.timeStamp).toDateString()}
      </RowField>
      <RowField prefix="Time">
        {item?.bookingData['_data']?.timeStamp
          ? new Date(item?.bookingData['_data']?.timeStamp).toLocaleTimeString()
          : new Date(item?.bookingData?.timeStamp).toLocaleTimeString()}
      </RowField>
      <RowField prefix="Total Amount:">
        $ {item.serviceData['_data'].price}
      </RowField>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  rowFieldWrapper: {
    flexDirection: 'row',
    paddingLeft: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: -10,
  },
  description: {
    width: width - 20,
    alignSelf: 'center',
    marginVertical: 10,
    borderTopWidth: 0.5,
    borderColor: 'grey',
    paddingTop: 15,
  },
});

export default BookingReciept;
