import React from 'react';
import {TouchableOpacity, Image, StyleSheet, View, Text} from 'react-native';

import {width} from '../../Theme/Dimensions';
import {SmallHeading} from './Heading';
import {Description} from './Description';
import {Theme} from '../../Theme/Theme';

interface ComponentProps {
  onPress: () => void;
  children?: React.ReactNode;
  item: any;
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

const CartRenderItem: React.FC<ComponentProps> = ({
  item,
  children,
  onPress,
  showPrice,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      style={StyleSheet.compose(styles.container, {
        flexDirection: 'column',
      })}>
      {item.map(k => {
        return (
          <View
            style={StyleSheet.compose(styles.container, {
              paddingTop: 5,
              paddingBottom: 0,
            })}>
            <Image style={styles.image} source={{uri: k._data.image}} />
            <View style={styles.subContainer}>
              <View style={styles.row}>
                <SmallHeading>{k._data.title}</SmallHeading>
                {showPrice && (
                  <View style={styles.priceWrapper}>
                    <SmallHeading size={10}>$ {k._data.price}</SmallHeading>
                  </View>
                )}
              </View>
              <View style={styles.margin} />
              <Description height={50} size={10}>
                {k._data.shortDescription}
              </Description>
            </View>
          </View>
        );
      })}
      <View
        style={StyleSheet.compose(styles.row, {
          marginTop: 5,
        })}>
        {children}
        <Text
          style={StyleSheet.compose(
            {
              color: Theme.colors.red,
              alignSelf: 'flex-end',
              fontFamily: Theme.fontFamily.Inter.regular,
              fontSize: 12,
            },
            {},
          )}>
          total Price :{' '}
          <Text
            style={StyleSheet.compose(
              {},
              {
                color: 'white',
                fontSize: 16,
                fontFamily: Theme.fontFamily.Inter.semiBold,
              },
            )}>
            ${' '}
            {item.reduce((acc, curr) => {
              return acc + parseInt(curr._data.price, 10);
            }, 0)}
          </Text>
        </Text>
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

export {ServiceRenderItem, CartRenderItem};
