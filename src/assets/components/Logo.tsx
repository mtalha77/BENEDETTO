import React from 'react';
import {Image, StyleSheet, View, TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {AppImages} from '../../Theme/AppImages';
import {LargeHeading} from './Heading';

interface ComponentProps {
  black?: boolean;
  back?: () => void;
  children?: string;
}

const Logo: React.FC<ComponentProps> = ({black = true, back, children}) => {
  return (
    <View>
      <View style={[styles.container, black && styles.black]}>
        <Image
          style={[styles.image, black && styles.size]}
          source={AppImages.logo}
        />
      </View>
      {back && (
        <View style={styles.row}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={back}
            style={styles.backButton}>
            <AntDesign name="arrowleft" color="white" size={22} />
          </TouchableOpacity>
          <LargeHeading>{children}</LargeHeading>
        </View>
      )}
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
  backButton: {
    borderRadius: 100,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 15,
    borderWidth: 1,
    borderColor: 'white',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export {Logo};
