import React from 'react';
import {useNetInfo} from '@react-native-community/netinfo';
import {View, Image, Text, StyleSheet} from 'react-native';

import {Provider} from 'react-redux';
import {store, persister} from './src/redux/store';
import {PersistGate} from 'redux-persist/lib/integration/react';

import MainNav from './src/navigation/MainNav';
import {Theme} from './src/Theme/Theme';
import {AppImages} from './src/Theme/AppImages';

const App = () => {
  const {isConnected} = useNetInfo();
  if (!isConnected) return <NoInterNet />;
  else
    return (
      <Provider store={store}>
        <PersistGate persistor={persister}>
          <MainNav />
        </PersistGate>
      </Provider>
    );
};

const NoInterNet = () => {
  return (
    <View style={styles.mainContainer}>
      <Image source={AppImages.logo} style={styles.logo} />
      <Text style={styles.heading}>No Internet</Text>
      <Text style={styles.description}>
        Please check your internet connection.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    resizeMode: 'contain',
    width: '50%',
    marginBottom: 100,
  },
  heading: {
    color: 'white',
    fontSize: 20,
    fontFamily: Theme.fontFamily.Inter.bold,
  },
  description: {
    color: Theme.colors.description,
    fontSize: 14,
    fontFamily: Theme.fontFamily.Inter.regular,
  },
});

export default App;
