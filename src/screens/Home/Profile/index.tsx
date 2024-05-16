import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import Octicons from 'react-native-vector-icons/Octicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {Theme} from '../../../Theme/Theme';
import {Logo} from '../../../assets/components/Logo';
import {width} from '../../../Theme/Dimensions';
import {AppImages, ServiceImages} from '../../../Theme/AppImages';
import {Description} from '../../../assets/components/Description';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

interface ScreenProps {
  navigation: NativeStackNavigationProp<any>;
}

const Profile: React.FC<ScreenProps> = ({navigation}) => {
  const List = [
    {
      icon: <Octicons name="gear" color={Theme.colors.red} size={19} />,
      tag: 'Settings',
      onPress: () => navigation.navigate('Settings'),
    },
    {
      icon: (
        <Image
          source={AppImages.bookingHistory}
          tintColor={Theme.colors.red}
          style={styles.listItemIcon}
        />
      ),
      tag: 'My Bookings',
      onPress: () => navigation.navigate('BookingHistory'),
    },
    {
      icon: (
        <AntDesign name="questioncircleo" color={Theme.colors.red} size={19} />
      ),
      tag: "FAQ's",
      onPress: () => navigation.navigate('FAQ'),
    },
    {
      icon: <MaterialIcons name="logout" color={Theme.colors.red} size={20} />,
      tag: 'Logout',
      onPress: () => navigation.replace('SplashScreen'),
    },
  ];

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={item?.onPress}
        style={styles.listItemContainer}>
        <View style={styles.listIconWrapper}>{item.icon}</View>
        <Text style={[styles.userName, styles.listItemTag]}>{item.tag}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <Logo />

      <FlatList
        ListHeaderComponent={() => {
          return (
            <View style={styles.profileCard}>
              <Image source={ServiceImages[3]} style={styles.image} />
              <Text style={styles.userName}>Lorem Ipsum</Text>
              <Description size={10}>lorem@Ipsum.com</Description>
            </View>
          );
        }}
        data={List}
        renderItem={renderItem}
        ItemSeparatorComponent={<View style={styles.listItemSeparator} />}
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
  profileCard: {
    width: width - 20,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    marginTop: width / 4 - 20,
    paddingBottom: 20,
    borderRadius: 10,
    marginBottom: 10,
  },
  userName: {
    color: 'white',
    fontFamily: Theme.fontFamily.Inter.semiBold,
    fontSize: 15,
    marginTop: 15,
    marginBottom: 5,
  },
  image: {
    borderRadius: 100,
    width: width / 5,
    height: width / 5,
    marginTop: -width / 4 / 2,
  },
  listItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  listIconWrapper: {
    width: 40,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listItemTag: {
    color: 'white',
    fontSize: 16,
    marginLeft: 15,
    marginTop: 5,
  },
  listItemSeparator: {
    height: 0.5,
    width: width - 20,
    alignSelf: 'center',
    backgroundColor: Theme.colors.description,
  },
  listItemIcon: {
    resizeMode: 'contain',
    width: '55%',
    height: '55%',
  },
});

export default Profile;
