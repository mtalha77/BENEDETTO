import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {Theme} from '../../Theme/Theme';

interface ComponentProps {
  children: string;
  size?: number;
  color?: string;
}

const SmallHeading: React.FC<ComponentProps> = ({
  children,
  size = 12,
  color,
}) => {
  return (
    <Text
      style={[
        styles.small,
        {
          fontSize: size,
        },
        color && {
          color: color,
        },
      ]}>
      {children}
    </Text>
  );
};

const LargeHeading: React.FC<ComponentProps> = ({children, size = 16}) => {
  return <Text style={[styles.large, {fontSize: size}]}>{children}</Text>;
};

const styles = StyleSheet.create({
  small: {
    color: 'white',
    fontFamily: Theme.fontFamily.Inter.medium,
  },
  large: {
    color: 'white',
    fontFamily: Theme.fontFamily.Inter.bold,
  },
});

export {SmallHeading, LargeHeading};
