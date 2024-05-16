import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {AppImages} from '../../Theme/AppImages';

interface ComponentProps {
  black?: boolean;
}

const Logo: React.FC<ComponentProps> = ({black = true}) => {
  return (
    <View style={[styles.container, black && styles.black]}>
      <Image
        style={[styles.image, black && styles.size]}
        source={AppImages.logo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30,
    paddingTop: 50,
  },
  wrapperSize: {},
  black: {
    backgroundColor: 'black',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    paddingTop: 0,
    paddingVertical: 10,
  },
  image: {
    width: '70%',
    resizeMode: 'contain',
  },
  size: {
    width: '50%',
  },
});

export {Logo};
