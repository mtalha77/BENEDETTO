import React, {useEffect} from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
import {useNavigation} from '@react-navigation/native';

import {Theme} from '../../Theme/Theme';
import {width} from '../../Theme/Dimensions';

import webClientId from '../../../android/app/google-services.json';

interface SocialLoginProps {
  children: string;
}

const SocialData = [
  {
    tag: 'Google',
    img: require('../../assets/images/google.webp'),
  },
  {
    tag: 'Facebook',
    img: require('../../assets/images/facebook.webp'),
  },
];

const SocialAuthentication: React.FC<SocialLoginProps> = ({children}) => {
  const navigation = useNavigation();
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: webClientId.client[0].oauth_client[1].client_id,
    });
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});

      const {idToken} = await GoogleSignin.signIn();

      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      const signedInUser = await auth().signInWithCredential(googleCredential);

      await handleNameSaving();

      return signedInUser;
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  const handleFacebookSignIn = async () => {
    try {
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);

      if (result.isCancelled) {
        throw 'User cancelled the login process';
      }

      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        throw 'Something went wrong obtaining access token';
      }

      const facebookCredential = auth.FacebookAuthProvider.credential(
        data.accessToken,
      );

      const signedInUser = auth().signInWithCredential(facebookCredential);

      await handleNameSaving();

      return signedInUser;
    } catch (error) {
      console.error('Error signing in with Facebook:', error);
    }
  };

  const handleNameSaving = async () => {
    const email = await auth().currentUser?.email;
    await firestore().collection('USERS').doc(email).set({
      displayName: auth().currentUser?.displayName,
    });

    return;
  };

  const onButtonPress = async type => {
    if (type === SocialData[0].tag) {
      const user = await handleGoogleSignIn();
      if (user?.user.emailVerified) {
        navigation.replace('HomeStack');
      }

      return;
    } else {
      const user = await handleFacebookSignIn();
      if (user?.user.emailVerified) {
        navigation.replace('HomeStack');
      }

      return;
    }
  };

  return (
    <View style={styles.socialLoginWrapper}>
      <View style={styles.socialTitleWrapper}>
        <View style={styles.socialTitleDecoration} />
        <Text style={styles.socialLoginTitle}>{children}</Text>
      </View>
      <View style={styles.socialButtonContainer}>
        {SocialData.map(k => {
          return (
            <TouchableOpacity
              onPress={() => onButtonPress(k.tag)}
              style={styles.socialContainer}>
              <Image source={k.img} style={styles.socialImage} />
              <Text style={styles.socialTag}>{k.tag}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  socialLoginWrapper: {},
  socialButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  socialTitleWrapper: {
    margin: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialTitleDecoration: {
    height: 1,
    backgroundColor: 'white',
    position: 'absolute',
    width: '100%',
  },
  socialLoginTitle: {
    color: 'white',
    fontSize: 12,
    fontFamily: Theme.fontFamily.Inter.medium,
    backgroundColor: Theme.colors.background,
    paddingHorizontal: 20,
  },
  socialContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'rgba(220, 219, 221, 1)',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: (width - 45) / 2,
    height: 50,
    backgroundColor: '#2B2B2B',
  },
  socialImage: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
  socialTag: {
    fontSize: 18,
    fontFamily: Theme.fontFamily.Inter.medium,
    color: 'white',
    marginLeft: 5,
  },
});

export default SocialAuthentication;
