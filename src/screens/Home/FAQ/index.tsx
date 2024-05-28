import React, {useState} from 'react';
import {View, TouchableOpacity, StyleSheet, FlatList} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import Entypo from 'react-native-vector-icons/Entypo';

import {Logo} from '../../../assets/components/Logo';
import {Theme} from '../../../Theme/Theme';
import {SmallHeading} from '../../../assets/components/Heading';
import {Description} from '../../../assets/components/Description';
import {width} from '../../../Theme/Dimensions';

interface ScreenProps {
  navigation: NativeStackNavigationProp<any>;
}

const DATA = [
  {
    question: 'How often should I get my car detailed?',
    answer:
      'It is suggested to clean your car thoroughly every 4-6 months. This helps keep it looking good and holds its worth. Yet, how often you do this can change. It depends on how much you drive and where you live.',
  },
  {
    question: 'How long does ceramic coating last?',
    answer:
      'Ceramic coatings have­ a lifetime of 2 to 5 years. It depe­nds on the specific product and maintenance. The durability of the coating can be longer with regular care.',
  },
  {
    question: 'Can ceramic coating be applied to any vehicle?',
    answer:
      "Indeed, cars of all kinds, new or old, can receive a ceramic coating. The greatest outcomes arise when applied to a vehicle with a surface that's spotless and slick.",
  },
  {
    question: 'How do I maintain my interior coating?',
    answer:
      'Keep your inside surfaces in good shape by cleaning regularly with suitable products. Refusing from harsh chemicals will help. Following the care directions given at the service can make it last longer.',
  },
  {
    question: 'How long does paint protection film last?',
    answer:
      'High-quality paint protection film can last up to 10 years with proper care. It provides long-term protection against various environmental and physical damages.',
  },
  {
    question: 'Will paint protection film affect the appearance of my car?',
    answer:
      'No, paint protection film is virtually invisible and will not change the appearance of your car. It increases the shine and provides a glossy finish while protecting the paint.',
  },
  {
    question: 'How do I book a service appointment?',
    answer:
      'You can book a service appointment through our website, or our mobile app, by calling our office, or by visiting our location in person. We recommend booking in advance to secure your preferred time slot.',
  },
];

const FAQ: React.FC<ScreenProps> = ({navigation}) => {
  const [selected, setSelected] = useState('');

  const renderItem = ({item, index}) => {
    return (
      <View>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setSelected(prev => (prev === index ? '' : index))}
          style={styles.questionWrapper}>
          <SmallHeading size={15}>{item.question}</SmallHeading>
          <View
            style={[
              styles.iconWrapper,
              selected === index && styles.selectedIconWrapper,
            ]}>
            <Entypo
              name={selected === index ? 'chevron-up' : 'chevron-down'}
              color={selected === index ? 'white' : 'black'}
              size={20}
            />
          </View>
        </TouchableOpacity>
        {selected === index && (
          <View style={styles.descriptionWrapper}>
            <Description size={12}>{item.answer}</Description>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <Logo back={() => navigation.goBack()}>FAQ's</Logo>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  questionWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 7.5,
  },
  iconWrapper: {
    width: 25,
    height: 25,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  selectedIconWrapper: {
    backgroundColor: 'transparent',
  },
  descriptionWrapper: {
    width: width - 30,
    alignSelf: 'center',
    paddingBottom: 15,
    borderBottomWidth: 0.5,
    borderColor: 'grey',
  },
});

export default FAQ;
