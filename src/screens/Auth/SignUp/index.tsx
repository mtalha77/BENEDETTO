import React, {useState} from 'react';
import {ScrollView, StyleSheet, View, TouchableOpacity} from 'react-native';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import AntDesign from 'react-native-vector-icons/AntDesign';

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

const SignUp: React.FC<ScreenProps> = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [check, setCheck] = useState(false);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.mainContainer}
      keyboardShouldPersistTaps="always">
      <Logo black={false} />
      <Heading>Create Your Account</Heading>
      <InputField value={email} setValue={setEmail} title="Email Address">
        Enter your email address
      </InputField>
      <View style={styles.rowInputWrapper}>
        <InputField title="Name" value={firstName} setValue={setFirstName}>
          First Name
        </InputField>
        <InputField
          value={lastName}
          setValue={setLastName}
          wrapperStyle={styles.secondInputField}>
          Last Name
        </InputField>
      </View>
      <InputField
        secure
        value={password}
        setValue={setPassword}
        title="Password">
        Enter Your Password
      </InputField>
      <View style={styles.checkWrapper}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setCheck(!check)}
          style={[styles.checkContainer, check && styles.checked]}>
          <AntDesign name="check" color={Theme.colors.background} size={22} />
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
          }}>
          <Description>
            By clicking Create account, I agree that I have read and accepted
            the Terms of Use and Privacy Policy.
          </Description>
        </View>
      </View>
      <Button onPress={() => {}}>SIGN UP</Button>
      <SocialLogin
        onPress={id => {
          console.log(id);
        }}>
        or Sign Up Using
      </SocialLogin>
      <TextInText
        prefix="Already have an account?"
        onPress={() => navigation.goBack()}>
        Sign In
      </TextInText>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  rowInputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-evenly',
  },
  secondInputField: {
    marginLeft: 0,
  },
  checkWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '100%',
  },
  checkContainer: {
    width: 25,
    height: 25,
    borderRadius: 5,
    borderColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 15,
    marginTop: 15,
    borderWidth: 1,
  },
  checked: {
    borderColor: 'white',
    backgroundColor: 'white',
  },
});

export default SignUp;
