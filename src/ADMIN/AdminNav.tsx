import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import Toast from 'react-native-toast-message';

import Login from './Login';
import {Theme} from '../Theme/Theme';
import CartListings from './CartListings';

const AdminNav = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={auth().currentUser?.email ? 'CartListings' : 'Login'}
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_bottom',
          statusBarColor: Theme.colors.background,
          navigationBarColor: Theme.colors.background,
          orientation: 'portrait',
        }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="CartListings" component={CartListings} />
      </Stack.Navigator>
      <Toast />
    </NavigationContainer>
  );
};

export default AdminNav;
