import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {Theme} from '../../Theme/Theme';

interface ComponentProps {
  children: string;
  size?: number;
  height?: number;
}

const Description: React.FC<ComponentProps> = ({
  children,
  size = 12,
  height,
}) => {
  return (
    <Text
      style={[
        styles.text,
        {
          fontSize: size,
        },
        height && {
          height: height,
        },
      ]}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    color: 'white',
    fontFamily: Theme.fontFamily.Inter.regular,
  },
});

export {Description};
