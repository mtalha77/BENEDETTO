import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ViewStyle,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import {Theme} from '../../Theme/Theme';
import {width} from '../../Theme/Dimensions';

interface HeadingProps {
  children: string;
}

export const Heading: React.FC<HeadingProps> = ({children}) => {
  return <Text style={styles.heading}>{children}</Text>;
};

interface DescriptionProps {
  children: string;
  color?: string;
}

export const Description: React.FC<HeadingProps> = ({children, color}) => {
  return (
    <Text style={[styles.description, color && {color: color}]}>
      {children}
    </Text>
  );
};

interface TextInTextProps {
  children: string;
  prefix: string;
  onPress: () => void;
}

export const TextInText: React.FC<TextInTextProps> = ({
  children,
  prefix,
  onPress,
}) => {
  return (
    <Text style={styles.textInTextPrefix}>
      {prefix}
      <Text style={styles.textInText} onPress={onPress}>
        {' '}
        {children}
      </Text>
    </Text>
  );
};

interface InputFieldProps {
  children: string;
  secure?: boolean;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  title?: string;
  wrapperStyle?: ViewStyle;
  keyboardType?: 'default' | 'email-address';
}

const InputField: React.FC<InputFieldProps> = ({
  children,
  secure,
  value,
  setValue,
  title,
  wrapperStyle = {},
  keyboardType = 'default',
}) => {
  const [show, setShow] = useState(true);

  return (
    <View style={[styles.inputFieldContainer, wrapperStyle]}>
      <Text style={styles.inputFieldTitle}>{title}</Text>
      <View style={styles.inputFieldWrapper}>
        <TextInput
          value={value}
          onChangeText={setValue}
          secureTextEntry={secure && show}
          style={styles.inputField}
          placeholder={children}
          placeholderTextColor={Theme.colors.description}
          keyboardType={keyboardType}
        />
        {secure && (
          <TouchableOpacity
            activeOpacity={1}
            style={styles.show}
            onPress={() => setShow(prev => !prev)}>
            <Ionicons name={show ? 'eye' : 'eye-off'} color="white" size={22} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    color: 'white',
    fontSize: 24,
    fontFamily: Theme.fontFamily.Inter.bold,
    marginLeft: 15,
  },
  description: {
    color: Theme.colors.description,
    fontSize: 12,
    fontFamily: Theme.fontFamily.Inter.regular,
    margin: 15,
  },
  inputFieldContainer: {
    margin: 15,
    flex: 1,
  },
  inputFieldWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: 'rgba(217, 217, 217, 0.21)',
    height: 50,
  },
  inputField: {
    flex: 1,
    color: 'white',
    fontFamily: Theme.fontFamily.Inter.regular,
    fontSize: 16,
    paddingHorizontal: 10,
  },
  show: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputFieldTitle: {
    fontSize: 12,
    fontFamily: Theme.fontFamily.Inter.medium,
    color: 'white',
    marginBottom: 2,
  },
  textInTextPrefix: {
    color: 'white',
    fontFamily: Theme.fontFamily.Inter.medium,
    fontSize: 12,
    textAlign: 'center',
    marginVertical: 30,
  },
  textInText: {
    color: Theme.colors.red,
  },
});

export default InputField;
