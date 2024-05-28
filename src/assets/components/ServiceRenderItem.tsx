import React from 'react';
import {TouchableOpacity, Image, StyleSheet, View} from 'react-native';

import {width} from '../../Theme/Dimensions';
import {SmallHeading} from './Heading';
import {Description} from './Description';

interface ComponentProps {
  onPress: () => void;
  children?: React.ReactNode;
  item: {img: number; title: string; description: string};
  showPrice?: boolean;
}

const ServiceRenderItem: React.FC<ComponentProps> = ({
  item,
  children,
  onPress,
  showPrice = false,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      style={styles.container}>
      <Image style={styles.image} source={{uri: item.image}} />
      <View style={styles.subContainer}>
        <View style={styles.row}>
          <SmallHeading>{item.title}</SmallHeading>
          {showPrice && (
            <View style={styles.priceWrapper}>
              <SmallHeading size={10}>$ {item.price}</SmallHeading>
            </View>
          )}
        </View>
        <View style={styles.margin} />

        <Description height={50} size={10}>
          {item.shortDescription}
        </Description>
        {children}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    width: width - 20,
    alignSelf: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    height: 100,
    width: 120,
    borderRadius: 5,
    overflow: 'hidden',
  },
  subContainer: {
    paddingLeft: 10,
    flex: 1,
    height: '100%',
  },
  margin: {
    height: 10,
  },
  priceWrapper: {
    alignItems: 'flex-end',
  },
});

export {ServiceRenderItem};
