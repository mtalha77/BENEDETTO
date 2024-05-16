import React, {useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {Logo} from '../../../assets/components/Logo';
import {Theme} from '../../../Theme/Theme';
import InputField, {Description, Heading} from '../AuthComponents';
import {Button} from '../../../assets/components/Button';

interface ScreenProps {
  navigation: NativeStackNavigationProp<any>;
}

const ResetPassword: React.FC<ScreenProps> = ({navigation}) => {
  const [confirmPassword, setConfirmPassword] = useState('');
  const [password, setPassword] = useState('');
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.mainContainer}
      keyboardShouldPersistTaps="always">
      <Logo black={false} />
      <Heading>Reset Password</Heading>
      <Description>
        Please enter new password to reset password for your account.
      </Description>

      <InputField
        secure
        value={password}
        setValue={setPassword}
        title="New Password">
        Enter New Password
      </InputField>
      <InputField
        secure
        value={confirmPassword}
        setValue={setConfirmPassword}
        title="Confirm Password">
        Confirm New Password
      </InputField>
      <Button onPress={() => navigation.replace('SplashScreen')}>Save</Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
});

export default ResetPassword;
