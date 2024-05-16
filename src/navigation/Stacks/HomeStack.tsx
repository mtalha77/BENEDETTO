import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native-safe-area-context';

import HomeTab from '../Tabs/HomeTab';

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
        }}>
        <Stack.Screen name="HomeTab" component={HomeTab} />
      </Stack.Navigator>
    </SafeAreaView>
  );
};

export default HomeStack;
