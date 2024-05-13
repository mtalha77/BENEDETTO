import React, {useEffect} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {Theme} from '../../Theme/Theme';
import {AppImages} from '../../Theme/AppImages';
import {width} from '../../Theme/Dimensions';

interface ScreenProps {
  navigation: NativeStackNavigationProp<any>;
}

const SplashScreen: React.FC<ScreenProps> = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('AuthStack');
    }, 1500);
  }, []);

  return (
    <View style={styles.mainContainer}>
      <Image source={AppImages.logo} style={styles.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: width * 0.8,
    resizeMode: 'contain',
  },
});

export default SplashScreen;
