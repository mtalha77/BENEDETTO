import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import Toast from 'react-native-toast-message';

import {Logo} from '../../../assets/components/Logo';
import {Theme} from '../../../Theme/Theme';
import InputField, {Description, Heading} from '../AuthComponents';
import {Button} from '../../../assets/components/Button';
import {CustomActivityIndicator} from '../../../assets/components/ActivityIndicator';

const re =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

interface ScreenProps {
  navigation: NativeStackNavigationProp<any>;
}

const ForgotPassword: React.FC<ScreenProps> = ({navigation}) => {
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
    } else {
      sendEmail();
    }
  };

  const sendEmail = async () => {
    setShowMessage('Verifying Email Address.');
    await auth().sendPasswordResetEmail(email);
    setShowMessage('');
    setEmail('');
    Toast.show({
      type: 'success',
      text1: 'Check your email.',
      text2: 'password reset link has been sent to your email.',
    });
    navigation.replace('ResetPassword');
  };

  return (
    <View style={styles.mainContainer}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always">
        <Logo black={false} />
        <Heading>Forgot Password?</Heading>
        <Description>
          To reset your password, enter your email address. We'll send a link to
          your inbox. Clicking this link will take you to a secure webpage where
          you can create a new password. This verification step helps ensure
          it's you requesting the password change.
        </Description>
        <InputField
          value={email}
          setValue={setEmail}
          keyboardType="email-address"
          title="Email Address">
          enter your email address here
        </InputField>
        <Button onPress={validate}>Continue</Button>
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
});

export default ForgotPassword;
