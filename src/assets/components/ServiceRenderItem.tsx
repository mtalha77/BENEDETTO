import React, {Component} from 'react';
import {TouchableOpacity, Text, Image, StyleSheet, View} from 'react-native';

import {width} from '../../Theme/Dimensions';
import {SmallHeading} from './Heading';
import {Description} from './Description';

interface ComponentProps {
  onPress: (ID: string) => void;
  children?: React.ReactNode;
  item: {img: number; title: string; description: string};
}

const ServiceRenderItem: React.FC<ComponentProps> = ({
  item,
  children,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={() => onPress(item.title)}
      style={styles.container}>
      <Image style={styles.image} source={item.img} />
      <View style={styles.subContainer}>
        <SmallHeading>{item.title}</SmallHeading>
        <View style={styles.margin} />

        <Description height={50} size={10}>
          {item.description}
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
});

export {ServiceRenderItem};
