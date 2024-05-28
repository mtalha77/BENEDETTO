import React, {useEffect, useRef} from 'react';
import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import {View, TouchableOpacity, Animated, Linking} from 'react-native';

import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import HomeScreen from '../../screens/Home/HomeScreen';
import WishList from '../../screens/Home/WishList';
import Cart from '../../screens/Home/Cart';
import Profile from '../../screens/Home/Profile';
import Chat from '../../screens/Home/Chat';
import {height, width} from '../../Theme/Dimensions';
import {Theme} from '../../Theme/Theme';

const HomeTab = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      tabBar={props => <MyTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      <Tab.Screen name="WishList" component={WishList} />
      <Tab.Screen name="Cart" component={Cart} />
      <Tab.Screen name="Chat" component={Chat} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

const TabBarIcons = {
  HomeScreen: <Entypo name="home" color="white" size={20} />,
  WishList: <AntDesign name="heart" color="white" size={20} />,
  Cart: <FontAwesome5 name="shopping-cart" color="white" size={17} />,
  Chat: <MaterialIcons name="chat" color="white" size={18} />,
  Profile: <Ionicons name="person" color="white" size={18} />,
};

const TabBarIconSelected = {
  HomeScreen: <Entypo name="home" color="black" size={20} />,
  WishList: <AntDesign name="heart" color="black" size={20} />,
  Cart: <FontAwesome5 name="shopping-cart" color="black" size={17} />,
  Chat: <MaterialIcons name="chat" color="black" size={18} />,
  Profile: <Ionicons name="person" color="black" size={18} />,
};

interface MyTabBarProps {
  state: any;
  descriptors: any;
  navigation: BottomTabNavigationProp<any>;
}

const MyTabBar = ({state, descriptors, navigation}) => {
  const position = useRef(new Animated.Value(0)).current;

  const IndicatorPosition = position.interpolate({
    inputRange: [0, 1],
    outputRange: [0, width / 5],
  });

  const IconPosition = index =>
    position.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -(width / 5)],
    });

  useEffect(() => {
    Animated.timing(position, {
      toValue: state.index,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [state.index]);

  return (
    <View
      style={{
        width: '100%',
        height: 60,
        backgroundColor: Theme.colors.background,
        justifyContent: 'center',
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          position: 'absolute',
        }}>
        {state.routes.map(route => {
          return (
            <View
              style={{
                alignItems: 'center',
                width: width / 5,
                height: 60,
                justifyContent: 'center',
              }}>
              {TabBarIcons[route.name]}
            </View>
          );
        })}
      </View>
      <Animated.View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: 'white',
          width: 30,
          height: 30,
          overflow: 'hidden',
          borderRadius: 100,
          marginLeft: width / 5 / 2 - 15,
          transform: [
            {
              translateX: IndicatorPosition,
            },
          ],
        }}>
        {state.routes.map((route, index) => {
          return (
            <Animated.View
              style={{
                alignItems: 'center',
                width: width / 5,
                height: 60,
                justifyContent: 'center',
                marginLeft: index === 0 ? -(width / 5 / 2 - 15) : 0,
                transform: [
                  {
                    translateX: IconPosition(index),
                  },
                ],
              }}>
              {TabBarIconSelected[route.name]}
            </Animated.View>
          );
        })}
      </Animated.View>
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;

          const onPress = () => {
            if (index !== 3) {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name, route.params);
              }
              return;
            } else {
              Linking.openURL(
                'whatsapp://send?text=BENEDETTO&phone=+923044648541',
              )
                .then(data => {
                  console.log('WhatsApp Opened');
                })
                .catch(() => {
                  alert('Make sure WhatsApp installed on your device');
                });
            }
          };

          return (
            <TouchableOpacity
              onPress={onPress}
              activeOpacity={1}
              style={{
                width: width / 5,
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            />
          );
        })}
      </View>
    </View>
  );
};

export default HomeTab;
