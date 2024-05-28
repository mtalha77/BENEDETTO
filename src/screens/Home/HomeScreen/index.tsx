import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  Animated,
  ActivityIndicator,
  Text,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import firestore from '@react-native-firebase/firestore';
import {useDispatch, useSelector} from 'react-redux';

import {Theme} from '../../../Theme/Theme';
import {Logo} from '../../../assets/components/Logo';
import {LargeHeading, SmallHeading} from '../../../assets/components/Heading';
import {AppImages} from '../../../Theme/AppImages';
import {width} from '../../../Theme/Dimensions';
import {Description} from '../../../assets/components/Description';
import {ServiceRenderItem} from '../../../assets/components/ServiceRenderItem';

interface ScreenProps {
  navigation: NativeStackNavigationProp<any>;
}

const HomeScreen: React.FC<ScreenProps> = ({navigation}) => {
  const [services, setServices] = useState([]);
  const scrollOffset = useRef(new Animated.Value(0)).current;
  const [showActivityIndicator, setShowActivityIndicator] = useState(false);

  useEffect(() => {
    handleGettingServices();
  }, []);

  const handleGettingServices = async () => {
    try {
      setShowActivityIndicator(true);
      const Services = await firestore().collection('SERVICES').get();
      if (Services) {
        setServices(Services.docs);
        setShowActivityIndicator(false);
      }
    } catch (error) {
      console.log('Error in HomeScreen handleGettingServices() ' + error);
    }
  };

  const renderItem = ({item}) => {
    return (
      <ServiceRenderItem
        item={item['_data']}
        onPress={() =>
          navigation.navigate('ServiceDetail', {
            item: item,
            path: '',
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
        data={services}
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
        ListEmptyComponent={() => {
          return (
            <View style={styles.activityIndicatorWrapper}>
              {showActivityIndicator && (
                <ActivityIndicator color="white" size="small" />
              )}
              <Text style={styles.messageText}>
                {showActivityIndicator
                  ? 'Fetching Services'
                  : 'No Data to Show'}
              </Text>
            </View>
          );
        }}
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
  activityIndicatorWrapper: {
    alignItem: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
  messageText: {
    color: 'white',
    fontSize: 12,
    fontFamily: Theme.fontFamily.Inter.regular,
    textAlign: 'center',
    marginTop: 10,
  },
});

export default HomeScreen;
