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
    question: 'Daffodils?',
    answer:
      'And then my heart with pleasure fills and dances with the daffodils',
  },
  {
    question: 'Daffodils?',
    answer:
      'And then my heart with pleasure fills and dances with the daffodils',
  },
  {
    question: 'Daffodils?',
    answer:
      'And then my heart with pleasure fills and dances with the daffodils',
  },
  {
    question: 'Daffodils?',
    answer:
      'And then my heart with pleasure fills and dances with the daffodils',
  },
  {
    question: 'Daffodils?',
    answer:
      'And then my heart with pleasure fills and dances with the daffodils',
  },
  {
    question: 'Daffodils?',
    answer:
      'And then my heart with pleasure fills and dances with the daffodils',
  },
  {
    question: 'Daffodils?',
    answer:
      'And then my heart with pleasure fills and dances with the daffodils',
  },
  {
    question: 'Daffodils?',
    answer:
      'And then my heart with pleasure fills and dances with the daffodils',
  },
  {
    question: 'Daffodils?',
    answer:
      'And then my heart with pleasure fills and dances with the daffodils',
  },
  {
    question: 'Daffodils?',
    answer:
      'And then my heart with pleasure fills and dances with the daffodils',
  },
  {
    question: 'Daffodils?',
    answer:
      'And then my heart with pleasure fills and dances with the daffodils',
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
    <FlatList
      data={DATA}
      ListHeaderComponent={() => {
        return <Logo back={() => navigation.goBack()}>FAQ's</Logo>;
      }}
      stickyHeaderIndices={[0]}
      renderItem={renderItem}
      style={styles.mainContainer}
      showsVerticalScrollIndicator={false}
    />
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
