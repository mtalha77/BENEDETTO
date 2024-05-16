import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native-safe-area-context';

import Login from '../../screens/Auth/Login';
import SignUp from '../../screens/Auth/SignUp';
import ForgotPassword from '../../screens/Auth/ForgotPassword';
import VerifyCode from '../../screens/Auth/VerifyCode';
import ResetPassword from '../../screens/Auth/ResetPassword';

const AuthStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="VerifyCode" component={VerifyCode} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
      </Stack.Navigator>
    </SafeAreaView>
  );
};

export default AuthStack;
