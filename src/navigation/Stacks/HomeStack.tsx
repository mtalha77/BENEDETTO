import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Platform, View} from 'react-native';
import {SQIPCore, SQIPCardEntry} from 'react-native-square-in-app-payments';

import HomeTab from '../Tabs/HomeTab';
import ServiceDetail from '../../screens/Home/ServiceDetail';
import BookingHistory from '../../screens/Home/BookingHistory';
import BookingReciept from '../../screens/Home/BookingReciept';
import Settings from '../../screens/Home/Settings';
import FAQ from '../../screens/Home/FAQ';
import {Theme} from '../../Theme/Theme';

const HomeStack = () => {
  const Stack = createNativeStackNavigator();

  useEffect(async () => {
    await SQIPCore.setSquareApplicationId(
      'sq0idp-w_oBVYp7Zx7F_tfkVa5N_g',
    );
    if (Platform.OS === 'ios') {
      await SQIPCardEntry.setIOSCardEntryTheme({
        saveButtonFont: {
          size: 25,
        },
        saveButtonTitle: 'Pay 💳 ',
        keyboardAppearance: 'Light',
        saveButtonTextColor: {
          r: 255,
          g: 0,
          b: 125,
          a: 0.5,
        },
      });
    }
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Theme.colors.background,
      }}>
      {Platform.OS === 'ios' && (
        <View
          style={{
            position: 'absolute',
            width: '100%',
            backgroundColor: 'black',
            height: 100,
          }}
        />
      )}
      <Stack.Navigator
        initialRouteName="HomeTab"
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
          statusBarColor: 'black',
        }}>
        <Stack.Screen name="HomeTab" component={HomeTab} />
        <Stack.Screen name="ServiceDetail" component={ServiceDetail} />
        <Stack.Screen name="BookingHistory" component={BookingHistory} />
        <Stack.Screen name="BookingReciept" component={BookingReciept} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="FAQ" component={FAQ} />
      </Stack.Navigator>
    </SafeAreaView>
  );
};

export default HomeStack;
