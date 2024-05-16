import React from 'react';
import {View, Text} from 'react-native';

import {Theme} from '../../../Theme/Theme';

interface ScreenProps {}

const Cart: React.FC<ScreenProps> = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Theme.colors.background,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text
        style={{
          color: 'white',
        }}>
        Cart Screen
      </Text>
    </View>
  );
};

export default Cart;
