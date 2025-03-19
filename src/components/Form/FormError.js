import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';

import theme from 'theme';

const styles = StyleSheet.create({
  container: {
    paddingVertical: 3,
    justifyContent: 'center',
    borderRadius: 3,
    width: '100%',
  },
  backgroundError: {
    backgroundColor: theme.backgroundError,
  },
  text: {
    textAlign: 'left',
    paddingRight: 14,
    ...theme.fontStyle({
      fontSize: 12,
    }),
  },
});

const FormError = ({ error, errorWithBackground, textStyle }) => (
  <View style={[styles.container, error && errorWithBackground && styles.backgroundError]}>
    {!!error && (
      <Text
        style={[styles.text, { color: errorWithBackground ? theme.text.white : theme.text.error }, textStyle]}
        numberOfLines={2}
      >
        {error}
      </Text>
    )}
  </View>
);

FormError.propTypes = {
  error: PropTypes.string,
  errorWithBackground: PropTypes.bool,
  textStyle: PropTypes.object,
};

export default FormError;
