import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import Toast from 'react-native-toast-message';

import {Logo} from '../assets/components/Logo';
import {Theme} from '../Theme/Theme';
import InputField, {Description, Heading} from '../screens/Auth/AuthComponents';
import {Button} from '../assets/components/Button';

import {CustomActivityIndicator} from '../assets/components/ActivityIndicator';

const re =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

interface ScreenProps {
  navigation: NativeStackNavigationProp<any>;
}

const Login: React.FC<ScreenProps> = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [showMessage, setShowMessage] = useState('');

  const validation = () => {
    if (email.length === 0 || password.length === 0) {
      Toast.show({
        type: 'error',
        text1: 'Invalid Form Submission',
        text2: 'Please enter your email and password',
      });
    } else if (!email.trim().match(re)) {
      Toast.show({
        type: 'error',
        text1: 'Invalid Email',
        text2: 'Please Enter Valid Email Address',
      });
    } else if (password.length < 8) {
      Toast.show({
        type: 'error',
        text1: 'Password too short',
        text2: 'Password should be at least 8 characters',
      });
    } else {
      CheckCredentials();
    }
  };

  const CheckCredentials = async () => {
    try {
      setShowMessage('Verifying Admin Credentials...');
      await auth().signInWithEmailAndPassword(email, password);
      setShowMessage('');
      setEmail('');
      setPassword('');
      navigation.replace('CartListings');
    } catch (error) {
      setShowMessage('');
      setEmail('');
      setPassword('');
      Toast.show({
        type: 'error',
        text1: 'Incorrect Credentials',
        text2: 'Entered Email or Password is incorrect',
      });
    }
  };

  return (
    <View style={styles.mainContainer}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always">
        <Logo black={false} />
        <Heading>Welcome Admin</Heading>
        <Description>
          Benedetto Auto Detail has been serving the market with more than a
          decade through premium coating and auto detailing services in town
          Orange County.
        </Description>
        <InputField
          value={email}
          setValue={setEmail}
          title="Email Address"
          keyboardType="email-address">
          Enter your email address
        </InputField>
        <InputField
          secure
          value={password}
          setValue={setPassword}
          title="Password">
          Enter Your Password
        </InputField>
        <Button onPress={validation}>LOGIN</Button>
      </ScrollView>
      <CustomActivityIndicator show={showMessage} />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  forgotPassword: {
    color: 'white',
    alignSelf: 'flex-end',
    margin: 15,
    marginTop: 0,
  },
});

export default Login;
