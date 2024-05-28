import React, {useState} from 'react';
import {ScrollView, StyleSheet, View, TouchableOpacity} from 'react-native';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Toast from 'react-native-toast-message';

import AntDesign from 'react-native-vector-icons/AntDesign';

import {Logo} from '../../../assets/components/Logo';
import {Theme} from '../../../Theme/Theme';
import InputField, {Description, Heading, TextInText} from '../AuthComponents';
import {Button} from '../../../assets/components/Button';
import SocialAuthentication from '../../../assets/components/SocialAuthentication';
import {CustomActivityIndicator} from '../../../assets/components/ActivityIndicator';

const re =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

interface ScreenProps {
  navigation: NativeStackNavigationProp<any>;
}

const SignUp: React.FC<ScreenProps> = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [check, setCheck] = useState(false);

  const [message, setMessage] = useState('');

  const validation = () => {
    if (
      email.length === 0 ||
      password.length === 0 ||
      firstName.length === 0 ||
      lastName.length === 0
    ) {
      Toast.show({
        type: 'error',
        text1: 'Invalid Form Submission',
        text2: 'Please Fill All Fields.',
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
    } else if (!check) {
      Toast.show({
        type: 'error',
        text1: 'Error.',
        text2: 'Please Accept Terms and Conditions.',
      });
    } else {
      AccountCreation();
    }
  };

  const AccountCreation = async () => {
    try {
      setMessage('creating user account...');
      const {user} = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      if (user) {
        await firestore()
          .collection('USERS')
          .doc(email)
          .set({
            displayName: firstName + ' ' + lastName,
          });
        await user.sendEmailVerification();
        Toast.show({
          type: 'success',
          text1: 'Account Created Successfully!',
          text2: 'Please check your email for verification.',
        });
        await auth().signOut();
        setEmail('');
        setFirstName('');
        setLastName('');
        setPassword('');
        setMessage('');
        navigation.goBack();
      }
    } catch (error) {
      setMessage('');
      setEmail('');
      setPassword('');
      setFirstName('');
      setLastName('');
      setCheck(false);
      Toast.show({
        type: 'error',
        text1: 'Error!',
        text2: 'Email is Already registered.',
      });
    }
  };

  return (
    <View style={styles.mainContainer}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always">
        <Logo black={false} />
        <Heading>Create Your Account</Heading>
        <InputField
          value={email}
          setValue={setEmail}
          title="Email Address"
          keyboardType="email-address">
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
        <Button onPress={validation}>SIGN UP</Button>
        <SocialAuthentication
          onPress={id => {
            console.log(id);
          }}>
          or Sign Up Using
        </SocialAuthentication>
        <TextInText
          prefix="Already have an account?"
          onPress={() => navigation.goBack()}>
          Sign In
        </TextInText>
      </ScrollView>
      <CustomActivityIndicator show={message} />
    </View>
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
