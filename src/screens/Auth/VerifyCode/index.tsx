import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {Logo} from '../../../assets/components/Logo';
import {Theme} from '../../../Theme/Theme';
import {Description, Heading} from '../AuthComponents';
import {Button} from '../../../assets/components/Button';
import {width} from '../../../Theme/Dimensions';

interface ScreenProps {
  navigation: NativeStackNavigationProp<any>;
}

const VerifyCode: React.FC<ScreenProps> = ({navigation}) => {
  const [code, setCode] = useState('');

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.mainContainer}
      keyboardShouldPersistTaps="always">
      <Logo black={false} />
      <Heading>Verify Code</Heading>
      <Description>Enter code to verify your email.</Description>

      <View
        style={{
          width: width - 30,
          height: 50,
          alignSelf: 'center',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        {[0, 1, 2, 3, 4, 5].map(k => {
          return (
            <View
              style={{
                height: '100%',
                backgroundColor: 'rgba(217, 217, 217, 0.21)',
                borderRadius: 5,
                alignItems: 'center',
                justifyContent: 'center',
                width: '15%',
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 18,
                  fontFamily: Theme.fontFamily.Inter.medium,
                }}>
                {code[k]}
              </Text>
            </View>
          );
        })}
        <TextInput
          cursorColor={'red'}
          maxLength={6}
          value={code}
          onChangeText={setCode}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            color: 'transparent',
          }}
        />
      </View>

      <Button onPress={() => navigation.replace('ResetPassword')}>
        Verify
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
});

export default VerifyCode;
