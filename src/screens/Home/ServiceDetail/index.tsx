import React, {useRef, useState, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ImageBackground,
  Platform,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import RBSheet from 'react-native-raw-bottom-sheet';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {SQIPCardEntry} from 'react-native-square-in-app-payments';

import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

import {Logo} from '../../../assets/components/Logo';
import {Theme} from '../../../Theme/Theme';
import {width} from '../../../Theme/Dimensions';
import {LargeHeading} from '../../../assets/components/Heading';
import {Description} from '../../../assets/components/Description';
import {Button} from '../../../assets/components/Button';
import {addToLiked, removeFromLiked} from '../../../redux/actions/Actions';
import Toast from 'react-native-toast-message';
import {CustomActivityIndicator} from '../../../assets/components/ActivityIndicator';

interface DateTimeFieldProps {
  children: string;
  onPress: () => void;
  iconName: string;
  title: string;
}

const DateTimeField: React.FC<DateTimeFieldProps> = ({
  children,
  onPress,
  iconName,
  title,
}) => (
  <>
    <Text style={styles.dateTimeFieldTitle}>{title}</Text>
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={styles.dateTimeFieldTouchable}
      accessibilityLabel={`${title} field`}
      accessibilityHint={`Tap to select ${title}`}>
      <Text
        style={[
          styles.dateTimeFieldText,
          title === children && styles.dateTimeFieldPlaceholder,
        ]}>
        {title === children && 'Select '}
        {children}
      </Text>
      <FontAwesome6 name={iconName} color="white" size={18} />
    </TouchableOpacity>
  </>
);

interface ScreenProps {
  navigation: NativeStackNavigationProp<any>;
  route: any;
}

const ServiceDetail: React.FC<ScreenProps> = ({navigation, route}) => {
  const dispatch = useDispatch();
  const dateTimeRBSheet = useRef<RBSheet>(null);
  const [pickerMode, setPickerMode] = useState<'date' | 'time' | ''>('');
  const {item, path} = route.params;
  const liked = useSelector((state: any) => state.liked);
  const [date, setDate] = useState('Date');
  const [time, setTime] = useState('Time');

  const [cardEntryInProgress, setCardEntryInProgress] = useState(false);

  const [showMessage, setShowMessage] = useState('');

  const ITEM = path === '' ? item : item.serviceData;

  const handleLiking = useCallback(() => {
    if (!liked.includes(ITEM.id)) {
      dispatch(addToLiked(ITEM.id));
    } else {
      dispatch(removeFromLiked(ITEM.id));
    }
  }, [dispatch, ITEM.id, liked]);

  const openDateTimeRBSheet = useCallback(() => {
    if (path === '' || path === 'history') {
      dateTimeRBSheet.current?.open();
    } else {
    }
  }, []);

  const dateSet = useCallback(
    (event: DateTimePickerEvent, selectedDate?: Date) => {
      if (selectedDate) {
        setDate(new Date(selectedDate));
      }
      if (Platform.OS === 'android') {
        setPickerMode('');
      }
    },
    [],
  );

  const timeSet = useCallback(
    (event: DateTimePickerEvent, selectedDate?: Date) => {
      if (selectedDate) {
        setTime(new Date(selectedDate));
      }
      if (Platform.OS === 'android') {
        setPickerMode('');
      }
    },
    [],
  );

  const bookService = async () => {
    if (date === 'Date' || time === 'Time') {
      Toast.show({
        type: 'error',
        text1: 'Booking Error!',
        text2: 'please give and date and time of your booking.',
      });
    } else {
      const cardEntryConfig = {
        collectPostalCode: false,
      };
      setCardEntryInProgress(true);
      dateTimeRBSheet.current.close();
      setTimeout(async () => {
        await SQIPCardEntry.startCardEntryFlow(
          cardEntryConfig,
          onCardNonceRequestSuccess,
          onCardEntryCancel,
        );
      }, 500);
    }
  };

  // Callback when successfully getting the card nonce details for processing
  const onCardNonceRequestSuccess = async cardDetails => {
    try {
      // take payment with the card details
      const url = 'https://api-qmahhinnza-uc.a.run.app/chargeForCookie';
      const params = {
        nonce: cardDetails.nonce,
        name: ITEM._data.title,
        amount: ITEM._data.price,
      };

      let response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });

      if (response.status === 200) {
        onEverythingDone();
      } else {
        let data = await response.json();
        Toast.show({
          type: 'error',
          text1: 'Payment error.',
          text2: data.errorMessage,
        });
      }

      // payment finished successfully
      // you must call this method to close card entry
      await SQIPCardEntry.completeCardEntry();
    } catch (ex) {
      // payment failed to complete due to error
      // notify card entry to show processing error
      await SQIPCardEntry.showCardNonceProcessingError(ex.message);
    }
  };

  // Callback when card entry is cancelled and UI is closed
  const onCardEntryCancel = () => {
    // Handle the cancel callback
    setCardEntryInProgress(false);
  };

  const onEverythingDone = async () => {
    setShowMessage('booking your slot');
    dateTimeRBSheet.current.close();
    let tempDate = new Date(date).toISOString();
    let tempTime = new Date(time).toISOString();
    let finalTimeStamp = `${tempDate.split('T')[0]}T${tempTime.split('T')[1]}`;

    await firestore()
      .collection('CART')
      .add({
        services:
          path === 'history' ? [item.bookingData._data.serviceID] : [item.id],
        timeStamp: finalTimeStamp,
        emailID: auth().currentUser?.email,
        displayName: auth().currentUser?.displayName,
      });

    setDate('Date');
    setTime('Time');
    setPickerMode('');
    setShowMessage('');
    Toast.show({
      type: 'success',
      text1: 'Success',
      text2: 'booked appointment succesfully',
    });
    navigation.navigate('BookingReciept', {
      item: {
        serviceData: [
          {
            _data: {
              shortDescription: ITEM._data.shortDescription,
              title: ITEM._data.title,
              price: ITEM._data.price,
            },
          },
        ],
        bookingData: {
          _data: {
            timeStamp: finalTimeStamp,
          },
        },
      },
      thanks: true,
      isComplete: false,
    });
  };

  const showReciept = () => {
    navigation.navigate('BookingReciept', {
      item: item,
      isComplete: false,
    });
  };

  return (
    <View style={styles.mainContainer}>
      <Logo back={() => navigation.goBack()} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollContainer}>
        <ImageBackground
          source={{uri: ITEM._data.image}}
          resizeMode="cover"
          style={styles.image}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 0, y: 1}}
            colors={['transparent', 'transparent', Theme.colors.background]}
            style={styles.imageGradient}
          />
        </ImageBackground>
        <View style={styles.contentContainer}>
          <LargeHeading>{ITEM._data.title}</LargeHeading>
          <View style={styles.row}>
            <AntDesign name="star" color="transparent" size={12} />
            <Text style={styles.rating} />
            {/* <Description size={10}> </Description> */}
          </View>
          <Description size={12}>{ITEM._data.description}</Description>
          <View style={[styles.row, styles.priceWrapper]}>
            <Text style={styles.price}>Total Price</Text>
            <Text style={styles.price}>$ {ITEM._data.price}</Text>
          </View>
        </View>
        <View style={styles.bottomButtonRowWrapper}>
          <TouchableOpacity
            onPress={handleLiking}
            activeOpacity={0.8}
            style={[
              styles.heartWrapper,
              liked.includes(ITEM.id) && styles.heartSelected,
            ]}
            accessibilityLabel="Like button"
            accessibilityHint="Tap to like or unlike this service">
            <AntDesign
              name={liked.includes(ITEM.id) ? 'heart' : 'hearto'}
              color="white"
              size={26}
            />
          </TouchableOpacity>
          <Button
            onPress={
              path === ''
                ? openDateTimeRBSheet
                : path === 'history'
                ? openDateTimeRBSheet
                : showReciept
            }>
            {path === ''
              ? 'Book Now'
              : path === 'history'
              ? 'Book Again'
              : 'View Receipt'}
          </Button>
        </View>
      </ScrollView>
      <RBSheet
        closeOnPressMask
        ref={dateTimeRBSheet}
        draggable
        height={320}
        customStyles={{
          container: styles.rbSheetContainer,
          draggableIcon: styles.rbSheetDraggableIcon,
        }}>
        <View style={styles.rbSheetContent}>
          <Text style={styles.price}>Please Fill Your Booking Information</Text>
          <DateTimeField
            title="Date"
            iconName="calendar-alt"
            onPress={() => {
              setPickerMode('date');
              if (Platform.OS !== 'android') {
                dateTimeRBSheet.current?.close();
              }
            }}>
            {date === 'Date' ? date : new Date(date).toDateString()}
          </DateTimeField>
          <DateTimeField
            title="Time"
            iconName="clock"
            onPress={() => {
              setPickerMode('time');
              if (Platform.OS !== 'android') {
                dateTimeRBSheet.current?.close();
              }
            }}>
            {time === 'Time' ? time : new Date(time).toLocaleTimeString()}
          </DateTimeField>
        </View>
        <View
          style={StyleSheet.compose(
            {
              width: '100%',
              height: 70,
            },
            {},
          )}>
          <Button onPress={bookService}>Continue</Button>
        </View>
      </RBSheet>
      {pickerMode !== '' &&
        (Platform.OS === 'android' ? (
          <DateTimePicker
            value={
              pickerMode === 'date'
                ? date === 'Date'
                  ? new Date()
                  : date
                : time === 'Time'
                ? new Date()
                : time
            }
            minimumDate={new Date()}
            mode={pickerMode}
            display="spinner"
            onChange={pickerMode === 'date' ? dateSet : timeSet}
            positiveButton={{label: 'select'}}
          />
        ) : (
          <View style={styles.pickerContainer}>
            <DateTimePicker
              value={
                pickerMode === 'date'
                  ? date === 'Date'
                    ? new Date()
                    : date
                  : time === 'Time'
                  ? new Date()
                  : time
              }
              minimumDate={pickerMode === 'date' && new Date()}
              mode={pickerMode}
              display="spinner"
              onChange={pickerMode === 'date' ? dateSet : timeSet}
              themeVariant="dark"
              style={styles.dateTimePicker}
            />
            <View style={styles.pickerButtonContainer}>
              <Button
                onPress={() => {
                  setPickerMode('');
                  dateTimeRBSheet.current?.open();
                }}>
                SELECT
              </Button>
            </View>
          </View>
        ))}
      <CustomActivityIndicator show={showMessage} />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  scrollContainer: {
    flex: 1,
  },
  image: {
    width: width - 20,
    height: 190,
    alignSelf: 'center',
    borderRadius: 5,
    overflow: 'hidden',
    marginVertical: 10,
  },
  imageGradient: {
    flex: 1,
  },
  contentContainer: {
    padding: 15,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  rating: {
    fontSize: 10,
    color: 'white',
    fontFamily: Theme.fontFamily.Inter.semiBold,
    marginHorizontal: 5,
  },
  priceWrapper: {
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 0,
  },
  price: {
    fontSize: 14,
    color: 'white',
    fontFamily: Theme.fontFamily.Inter.semiBold,
  },
  bottomButtonRowWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heartWrapper: {
    marginLeft: 15,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10,
  },
  heartSelected: {
    borderWidth: 0,
  },
  rbSheetContainer: {
    backgroundColor: Theme.colors.background,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  rbSheetDraggableIcon: {
    width: 80,
  },
  rbSheetContent: {
    padding: 15,
  },
  dateTimeFieldTitle: {
    fontFamily: Theme.fontFamily.Inter.medium,
    color: 'white',
    fontSize: 12,
    marginTop: 20,
  },
  dateTimeFieldTouchable: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(217,217,217,0.21)',
    padding: 15,
    borderRadius: 8,
    marginTop: 3,
  },
  dateTimeFieldText: {
    fontFamily: Theme.fontFamily.Inter.light,
    fontSize: 14,
    color: 'white',
  },
  dateTimeFieldPlaceholder: {
    color: Theme.colors.description,
  },
  pickerContainer: {
    position: 'absolute',
    alignItems: 'center',
    alignSelf: 'center',
    bottom: 0,
    width: width,
    backgroundColor: Theme.colors.background,
  },
  dateTimePicker: {
    backgroundColor: Theme.colors.background,
  },
  pickerButtonContainer: {
    width: '100%',
  },
});

export default ServiceDetail;
