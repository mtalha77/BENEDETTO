import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import Toast from 'react-native-toast-message';

import {Logo} from '../../../assets/components/Logo';
import InputField from '../../Auth/AuthComponents';
import {Theme} from '../../../Theme/Theme';
import {Button} from '../../../assets/components/Button';
import {LargeHeading} from '../../../assets/components/Heading';
import {Description} from '../../../assets/components/Description';
import {CustomActivityIndicator} from '../../../assets/components/ActivityIndicator';

const re =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

interface ScreenProps {
  navigation: NativeStackNavigationProp<any>;
}

const Settings: React.FC<ScreenProps> = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [showMessage, setShowMessage] = useState('');

  const validate = () => {
    if (email.length === 0) {
      Toast.show({
        type: 'error',
        text1: 'Invalid Form Submission.',
        text2: 'please enter your email address.',
      });
    } else if (!email.trim().match(re)) {
      Toast.show({
        type: 'error',
        text1: 'Invalid Email.',
        text2: 'please enter valid email address.',
      });
    } else if (!(email.trim() == auth().currentUser?.email)) {
      Toast.show({
        type: 'error',
        text1: 'Verification Error.',
        text2: 'please enter email with you signed up',
      });
      setEmail('');
    } else {
      sendEmail();
    }
  };

  const sendEmail = async () => {
    setShowMessage('acting on your request to change password.');
    await auth().sendPasswordResetEmail(email);
    setShowMessage('');
    setEmail('');
    Toast.show({
      type: 'success',
      text1: 'Check your email.',
      text2: 'password reset link has been sent to your email.',
    });
    navigation.goBack();
  };

  return (
    <View style={styles.mainContainer}>
      <Logo back={() => navigation.goBack()}>Change Password</Logo>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always">
        <View style={styles.textWrapper}>
          <LargeHeading>Do you want to change your password?</LargeHeading>
          <View style={styles.textSeparator} />
          <Description>
            To change your password, enter your email address. We'll send a link
            to your inbox. Clicking this link will take you to a secure webpage
            where you can create a new password. This verification step helps
            ensure it's you requesting the password change.
          </Description>
        </View>
        <InputField
          title="Email Address"
          value={email}
          keyboardType="email-address"
          setValue={setEmail}>
          enter your email address here
        </InputField>
        <Button onPress={validate}>CONTINUE</Button>
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
  textWrapper: {
    padding: 20,
  },
  textSeparator: {
    height: 15,
  },
});

export default Settings;
