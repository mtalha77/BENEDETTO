import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text} from 'react-native';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {Logo} from '../../../assets/components/Logo';
import {Theme} from '../../../Theme/Theme';
import InputField, {
  Description,
  Heading,
  SocialLogin,
  TextInText,
} from '../AuthComponents';
import {Button} from '../../../assets/components/Button';

interface ScreenProps {
  navigation: NativeStackNavigationProp<any>;
}

const Login: React.FC<ScreenProps> = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.mainContainer}
      keyboardShouldPersistTaps="always">
      <Logo black={false} />
      <Heading>Welcome to Benedetto</Heading>
      <Description>
        Benedetto Auto Detail has been serving the market with more than a
        decade through premium coating and auto detailing services in town
        Orange County.
      </Description>
      <InputField value={email} setValue={setEmail} title="Email Address">
        Enter your email address
      </InputField>
      <InputField
        secure
        value={password}
        setValue={setPassword}
        title="Password">
        Enter Your Password
      </InputField>
      <Text style={styles.forgotPassword}>Forgot Password?</Text>
      <Button onPress={() => {}}>LOGIN</Button>
      <SocialLogin
        onPress={id => {
          console.log(id);
        }}>
        or Sign In Using
      </SocialLogin>
      <TextInText
        prefix="Don't have an account?"
        onPress={() => navigation.navigate('SignUp')}>
        Sign Up
      </TextInText>
    </ScrollView>
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
