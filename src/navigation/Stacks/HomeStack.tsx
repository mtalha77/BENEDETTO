import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native-safe-area-context';

import HomeTab from '../Tabs/HomeTab';
import ServiceDetail from '../../screens/Home/ServiceDetail';
import BookingHistory from '../../screens/Home/BookingHistory';
import BookingReciept from '../../screens/Home/BookingReciept';
import Settings from '../../screens/Home/Settings';
import FAQ from '../../screens/Home/FAQ';

const HomeStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
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
