const weights = {
  100: 'Thin',
  200: 'ExtraLight',
  300: 'Light',
  400: 'Regular',
  500: 'Medium',
  600: 'SemiBold',
  700: 'Bold',
  800: 'ExtraBold',
  900: 'Black',
};

const styles = {
  italic: 'Italic',
  normal: 'normal',
};

const defaultStyle = {
  fontFamily: 'Arial',
  fontSize: 16,
  fontWeight: '400',
  fontStyle: styles.normal,
  color: '#141205',
};

const fontFamilyStyle = (fontStyles) => {
  const newFontStyles = { ...defaultStyle, ...fontStyles };

  const fontWeight = weights[newFontStyles.fontWeight] || 'Regular';

  return {
    ...newFontStyles,
    fontFamily: `${defaultStyle.fontFamily}-${fontWeight}`,
  };
};

export default fontFamilyStyle;
