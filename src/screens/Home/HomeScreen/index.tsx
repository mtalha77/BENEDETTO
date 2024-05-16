import React, {useRef} from 'react';
import {View, ImageBackground, StyleSheet, Animated} from 'react-native';

import {Theme} from '../../../Theme/Theme';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Logo} from '../../../assets/components/Logo';
import {LargeHeading, SmallHeading} from '../../../assets/components/Heading';
import {AppImages, ServiceImages} from '../../../Theme/AppImages';
import {width} from '../../../Theme/Dimensions';
import {Description} from '../../../assets/components/Description';
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

const HomeScreen: React.FC<ScreenProps> = ({navigation}) => {
  const scrollOffset = useRef(new Animated.Value(0)).current;

  const renderItem = ({item}) => {
    return (
      <ServiceRenderItem
        item={item}
        onPress={() =>
          navigation.navigate('ServiceDetail', {
            item: item,
            wish: false,
          })
        }>
        <SmallHeading color={Theme.colors.red}>Read More</SmallHeading>
      </ServiceRenderItem>
    );
  };

  const moveHeader = scrollOffset.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -1],
  });

  return (
    <View style={styles.mainContainer}>
      <Animated.View
        style={{
          position: 'absolute',
          top: 80,
          left: 10,
          transform: [
            {
              translateY: moveHeader,
            },
          ],
        }}>
        <ImageBackground
          source={AppImages.HomeBanner}
          style={styles.bannerImage}>
          <View style={styles.bannerOpacity} />
          <LargeHeading size={18}>
            Welcome To{'\n'}BENEDETTO AUTO DETAIL
          </LargeHeading>
          <View style={styles.margin} />
          <Description>
            Benedetto Auto Detail has been serving the market with more than a
            decade through premium coating and auto detailing services in town
            Orange County. We are located in Ladera Ranch, CA and serving all
            across the Orange County.
          </Description>
        </ImageBackground>
      </Animated.View>
      <Logo />

      <Animated.FlatList
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollOffset}}}],
          {
            useNativeDriver: true,
          },
        )}
        data={Services}
        stickyHeaderIndices={[0]}
        ListHeaderComponent={() => {
          return (
            <View style={styles.headingWrapper}>
              <LargeHeading>Services We offer</LargeHeading>
            </View>
          );
        }}
        contentContainerStyle={styles.listContainerStyle}
        ItemSeparatorComponent={<View style={styles.margin} />}
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
  mainContentContainerStyle: {
    backgroundColor: Theme.colors.background,
  },
  listContainerStyle: {
    paddingTop: 205,
    paddingBottom: 50,
  },
  bannerImage: {
    width: width - 20,
    alignSelf: 'center',
    marginVertical: 10,
    padding: 10,
    overflow: 'hidden',
    borderRadius: 5,
    height: 190,
    justifyContent: 'center',
  },
  bannerOpacity: {
    position: 'absolute',
    backgroundColor: 'black',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.6,
  },
  margin: {
    height: 10,
  },
  headingWrapper: {
    padding: 15,
    backgroundColor: Theme.colors.background,
  },
});

export default HomeScreen;
