import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {Logo} from '../../../assets/components/Logo';
import {Theme} from '../../../Theme/Theme';
import {Description, Heading} from '../AuthComponents';
import {Button} from '../../../assets/components/Button';

interface ScreenProps {
  navigation: NativeStackNavigationProp<any>;
}

const ResetPassword: React.FC<ScreenProps> = ({navigation}) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.mainContainer}
      keyboardShouldPersistTaps="always">
      <Logo black={false} />
      <Heading>Check Your Email.</Heading>
      <Description>
        Password reset link has been sent to your email address, click on the
        link and enter new password for your account.
      </Description>
      <Button onPress={() => navigation.goBack()}>OK</Button>
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
