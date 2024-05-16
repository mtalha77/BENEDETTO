import React, {useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {Logo} from '../../../assets/components/Logo';
import {Theme} from '../../../Theme/Theme';
import InputField, {Description, Heading, SocialLogin} from '../AuthComponents';
import {Button} from '../../../assets/components/Button';

interface ScreenProps {
  navigation: NativeStackNavigationProp<any>;
}

const ForgotPassword: React.FC<ScreenProps> = ({navigation}) => {
  const [email, setEmail] = useState('');

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.mainContainer}
      keyboardShouldPersistTaps="always">
      <Logo black={false} />
      <Heading>Forgot Password?</Heading>
      <Description>Enter your email address to reset password.</Description>
      <InputField value={email} setValue={setEmail} title="Email Address">
        Enter your email address
      </InputField>
      <Button onPress={() => navigation.replace('VerifyCode')}>Continue</Button>
      <SocialLogin
        onPress={id => {
          console.log(id);
        }}>
        or Sign In Using
      </SocialLogin>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
});

export default ForgotPassword;
