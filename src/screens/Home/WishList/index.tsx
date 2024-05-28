import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import firestore from '@react-native-firebase/firestore';

import {Theme} from '../../../Theme/Theme';
import {Logo} from '../../../assets/components/Logo';
import {LargeHeading, SmallHeading} from '../../../assets/components/Heading';
import {ServiceRenderItem} from '../../../assets/components/ServiceRenderItem';
import {removeFromLiked} from '../../../redux/actions/Actions';

interface ScreenProps {
  navigation: NativeStackNavigationProp<any>;
}

const WishList: React.FC<ScreenProps> = ({navigation}) => {
  const {liked} = useSelector(state => state);
  const dispatch = useDispatch();
  const [services, setServices] = useState([]);
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
      console.log('Error in WishList Screen handleGettingServices() ' + error);
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
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <SmallHeading color={Theme.colors.red}>Read More</SmallHeading>
          <SmallHeading
            onPress={() => {
              dispatch(removeFromLiked(item.id));
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
      data={services.filter(f => liked?.includes(f.id))}
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
      ListEmptyComponent={() => {
        return (
          <View style={styles.activityIndicatorWrapper}>
            {showActivityIndicator && (
              <ActivityIndicator color="white" size="small" />
            )}
            <Text style={styles.messageText}>
              {showActivityIndicator
                ? 'Fetching wishlist'
                : 'nothing in wishlist'}
            </Text>
          </View>
        );
      }}
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
  activityIndicatorWrapper: {
    alignItems: 'center',
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

export default WishList;
