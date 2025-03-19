import { Dimensions } from 'react-native';
import fontFamilyStyle from 'helpers/font';

const primary = '#005DA9';
const secondary = '#F8F3F0';
const tertiary = '#F2F2F2';

const silver = '#DEDEDE';
const gray = '#6E6E6E';
const white = '#FFFFFF';
const red = '#FC2947';
const green = '#297E65';
const black = '#000000';
const blue = '#005DA9';

export default {
  // Font
  fontFamily: 'Arial',
  fontSizeBase: 14,
  paddingHorizontal: 20,

  primary,
  secondary,
  tertiary,

  silver,
  gray,
  white,
  red,
  green,
  black,
  blue,

  textInputBorderColor: tertiary,
  textInputBorderColorFocus: blue,

  backgroundScreen: white,
  backgroundSafeArea: tertiary,
  backgroundHeader: tertiary,
  primaryBackgroundSplash: white,
  backgroundError: red,

  headerTitleColor: black,
  headerSubtitleColor: white,

  backgroundSearch: tertiary,
  iconSearch: gray,

  text: {
    default: black,
    white: white,
    error: red,
    primary: primary,
    secondary: secondary,
    placeholder: gray,
    silver: silver,
  },

  fontStyle: (styles) => fontFamilyStyle(styles),

  screenWidth: Dimensions.get('window').width,
  screenHeight: Dimensions.get('window').height,
};
