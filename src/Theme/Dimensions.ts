import {Dimensions} from 'react-native';
const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
export const width: number = Math.min(screenWidth, screenHeight);
export const height: number = Math.max(screenWidth, screenHeight);