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

interface SocialLoginProps {
  onPress: (id: string) => void;
  children: string;
}

const SocialData = [
  {
    tag: 'Google',
    img: require('../../assets/images/google.webp'),
  },
  {
    tag: 'Facebook',
    img: require('../../assets/images/facebook.webp'),
  },
];

export const SocialLogin: React.FC<SocialLoginProps> = ({
  children,
  onPress,
}) => {
  return (
    <View style={styles.socialLoginWrapper}>
      <View style={styles.socialTitleWrapper}>
        <View style={styles.socialTitleDecoration} />
        <Text style={styles.socialLoginTitle}>{children}</Text>
      </View>
      <View style={styles.socialButtonContainer}>
        {SocialData.map(k => {
          return (
            <TouchableOpacity
              onPress={() => onPress(k.tag)}
              style={styles.socialContainer}>
              <Image source={k.img} style={styles.socialImage} />
              <Text style={styles.socialTag}>{k.tag}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
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
}

const InputField: React.FC<InputFieldProps> = ({
  children,
  secure,
  value,
  setValue,
  title,
  wrapperStyle = {},
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
  socialLoginWrapper: {},
  socialButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  socialTitleWrapper: {
    margin: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialTitleDecoration: {
    height: 1,
    backgroundColor: 'white',
    position: 'absolute',
    width: '100%',
  },
  socialLoginTitle: {
    color: 'white',
    fontSize: 12,
    fontFamily: Theme.fontFamily.Inter.medium,
    backgroundColor: Theme.colors.background,
    paddingHorizontal: 20,
  },
  socialContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'rgba(220, 219, 221, 1)',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: (width - 45) / 2,
    height: 50,
    backgroundColor: '#2B2B2B',
  },
  socialImage: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
  socialTag: {
    fontSize: 18,
    fontFamily: Theme.fontFamily.Inter.medium,
    color: 'white',
    marginLeft: 5,
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
