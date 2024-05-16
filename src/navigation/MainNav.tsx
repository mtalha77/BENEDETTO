import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Theme} from '../Theme/Theme';

import SplashScreen from '../screens/SplashScreen';
import AuthStack from './Stacks/AuthStack';
import HomeStack from './Stacks/HomeStack';

const MainNav = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{
          headerShown: false,
          statusBarColor: Theme.colors.background,
          navigationBarColor: Theme.colors.background,
        }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="AuthStack" component={AuthStack} />
        <Stack.Screen name="HomeStack" component={HomeStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNav;
