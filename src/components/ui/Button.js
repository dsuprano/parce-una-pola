import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import theme from 'theme';

const styles = StyleSheet.create({
  button: {
    minWidth: 50,
    minHeight: 50,
    backgroundColor: theme.primary,
    padding: 15,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    textAlign: 'center',
    maxWidth: 250,
    ...theme.fontStyle({
      color: theme.white,
      fontSize: 18,
      fontWeight: '700',
    }),
  },
  buttonOutline: {
    borderWidth: 1,
    borderColor: theme.primary,
    backgroundColor: 'transparent',
  },
  buttonOutlineText: {
    color: theme.primary,
  },
  buttonSimple: {
    backgroundColor: 'transparent',
  },
  buttonSimpleText: {
    color: theme.black,
  },
  buttonCancelText: {
    color: theme.text.white,
  },
});

const Button = ({
  children,
  outline = false,
  simple = false,
  cancel = false,
  style = {},
  textStyle = {},
  isLoading = false,
  disabled = false,
  ...props
}) => {
  const buttonStyle = [styles.button, outline && styles.buttonOutline, simple && styles.buttonSimple, style];

  const buttonTextStyle = [
    styles.buttonText,
    outline && styles.buttonOutlineText,
    simple && styles.buttonSimpleText,
    cancel && styles.buttonCancelText,
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      {...props}
      disabled={isLoading || disabled}
      activeOpacity={0.3}
      accessibilityState={{ disabled: isLoading || disabled, busy: isLoading }}
    >
      {isLoading ? (
        <ActivityIndicator color={outline ? theme.primary : theme.white} />
      ) : (
        <Text style={buttonTextStyle}>{children}</Text>
      )}
    </TouchableOpacity>
  );
};

Button.propTypes = {
  outline: PropTypes.bool,
  simple: PropTypes.bool,
  cancel: PropTypes.bool,
  style: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.array]),
  textStyle: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  children: PropTypes.node.isRequired,
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default Button;
