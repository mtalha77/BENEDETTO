import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';

import {Theme} from '../../../Theme/Theme';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Logo} from '../../../assets/components/Logo';
import {LargeHeading, SmallHeading} from '../../../assets/components/Heading';
import {ServiceImages} from '../../../Theme/AppImages';
import {ServiceRenderItem} from '../../../assets/components/ServiceRenderItem';

interface ScreenProps {
  navigation: NativeStackNavigationProp<any>;
}

const Services = [
  {
    img: ServiceImages['1'],
    title: 'Auto Detailing',
    description:
      'Welcome to Benedetto Auto Detail, your one-stop solution for premium auto detailing services.',
  },
  {
    img: ServiceImages['2'],
    title: 'Ceramic Coating',
    description:
      'CRYSTAL SERUM CERAMIC COATING provides a Supreme Hard Protection, Scratch & Swirls Resistant.',
  },
  {
    img: ServiceImages['3'],
    title: 'Interior Coating',
    description:
      'LEATHER GUARD COATING is made out of nanotechnology and is a Super Hydro-Phobic Coating that Protects.',
  },
  {
    img: ServiceImages['4'],
    title: 'Paint Protection Film',
    description:
      'Benedetto Auto Detail understands that your vehicle is an investment that you want to protect.',
  },
];

const WishList: React.FC<ScreenProps> = ({navigation}) => {
  const renderItem = ({item}) => {
    return (
      <ServiceRenderItem
        item={item}
        onPress={() =>
          navigation.navigate('ServiceDetail', {
            item: item,
            wish: true,
          })
        }>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <SmallHeading color={Theme.colors.red}>Read More</SmallHeading>
          <SmallHeading
            onPress={() => {
              console.log('removed Item');
            }}
            color={Theme.colors.red}>
            Remove From List
          </SmallHeading>
        </View>
      </ServiceRenderItem>
    );
  };

  return (
    <FlatList
      data={Services}
      stickyHeaderIndices={[0]}
      ListHeaderComponent={() => {
        return (
          <View>
            <Logo />
            <View style={styles.headingWrapper}>
              <LargeHeading>Services In Your Wishlist</LargeHeading>
            </View>
          </View>
        );
      }}
      contentContainerStyle={styles.mainContentContainerStyle}
      style={styles.mainContainer}
      ItemSeparatorComponent={<View style={styles.margin} />}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  mainContentContainerStyle: {
    backgroundColor: Theme.colors.background,
    paddingBottom: 50,
  },

  margin: {
    height: 10,
  },
  headingWrapper: {
    padding: 15,
    backgroundColor: Theme.colors.background,
  },
});

export default WishList;
