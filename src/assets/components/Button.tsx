import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {Theme} from '../../Theme/Theme';

interface ComponentProps {
  children: string;
  onPress: () => void;
  disabled?: boolean;
}

const Button: React.FC<ComponentProps> = ({
  children,
  onPress,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        disabled && {
          backgroundColor: 'grey',
        },
      ]}
      disabled={disabled}
      activeOpacity={0.8}>
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.colors.red,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 15,
    flex: 1,
    height: 40,
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontFamily: Theme.fontFamily.Inter.medium,
  },
});

export {Button};
