import React from 'react';
import {View, StyleSheet} from 'react-native';

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
  return (
    <View style={styles.mainContainer}>
      <Logo back={() => navigation.goBack()}>
        {thanks
          ? 'Thank You For Booking Us!'
          : 'Your Booking Details Given Below'}
      </Logo>

      {thanks && (
        <>
          <Description color="white">{item.description}</Description>
          <View style={styles.description}>
            <LargeHeading>Your Booking Details Given Below</LargeHeading>
          </View>
        </>
      )}
      <RowField prefix="Name">Lorem Ipsum</RowField>
      <RowField prefix="Service">{item.title}</RowField>
      <RowField prefix="Date">30/02/2025</RowField>
      <RowField prefix="Time">12:30 AM</RowField>
      <RowField prefix="Total Amount:">$120</RowField>
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
