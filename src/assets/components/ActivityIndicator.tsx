import React from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';

import {Theme} from '../../Theme/Theme';

interface ComponentProps {
  show: string;
}

const CustomActivityIndicator: React.FC<ComponentProps> = ({show}) => {
  if (show.length !== 0)
    return (
      <View style={styles.mainContainer}>
        <View style={[styles.mainContainer, styles.shadow]} />
        <View style={styles.card}>
          <ActivityIndicator size="large" color="black" />
          <View style={styles.textWrapper}>
            <Text style={styles.title}>Please wait...</Text>
            <Text style={styles.description}>{show}</Text>
          </View>
        </View>
      </View>
    );
  else return null;
};

const styles = StyleSheet.create({
  mainContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shadow: {
    backgroundColor: 'black',
    opacity: 0.4,
  },
  card: {
    backgroundColor: 'white',
    width: '90%',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  textWrapper: {
    borderLeftWidth: 0.5,
    borderColor: 'grey',
    marginLeft: 10,
    paddingHorizontal: 10,
  },
  title: {
    color: 'black',
    fontSize: 16,
    fontFamily: Theme.fontFamily.Inter.semiBold,
  },
  description: {
    color: 'grey',
    fontSize: 12,
    fontFamily: Theme.fontFamily.Inter.light,
    marginTop: 5,
  },
});

export {CustomActivityIndicator};
