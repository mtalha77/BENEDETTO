import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';

import {Logo} from '../../../assets/components/Logo';
import InputField from '../../Auth/AuthComponents';
import {Theme} from '../../../Theme/Theme';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Button} from '../../../assets/components/Button';

interface ScreenProps {
  navigation: NativeStackNavigationProp<any>;
}

const Settings: React.FC<ScreenProps> = ({navigation}) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <View style={styles.mainContainer}>
      <Logo back={() => navigation.goBack()}>Change Password</Logo>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always">
        <InputField
          title="Current Password"
          secure
          value={currentPassword}
          setValue={setCurrentPassword}>
          Enter Your Current Password
        </InputField>
        <InputField
          title="New Password"
          secure
          value={newPassword}
          setValue={setNewPassword}>
          Enter Your New Password
        </InputField>
        <InputField
          title="Confirm Password"
          secure
          value={confirmPassword}
          setValue={setConfirmPassword}>
          Confirm Your New Password
        </InputField>
        <Button onPress={() => {}}>SAVE</Button>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
});

export default Settings;
