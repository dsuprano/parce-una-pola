import React, { useState, forwardRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, TextInput, Pressable, Keyboard } from 'react-native';
import { useField, useFormikContext } from 'formik';

import theme from 'theme';
import FormError from './FormError';

const setBorderColor = (error, isCodeFull) => {
  if (error) {
    return theme.red;
  }

  if (isCodeFull) {
    return theme.primary;
  }

  return theme.textInputBorderColor;
};

const style = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  hiddenCodeInput: {
    position: 'absolute',
    height: 0,
    width: 0,
    opacity: 0,
    ...theme.fontStyle({
      fontSize: 18,
      fontWeight: '700',
      color: theme.primary,
    }),
  },
  inputsContainer: {
    flexDirection: 'row',
    gap: 15,
  },
  inputContainer: (error, isCodeFull, maxLength) => ({
    backgroundColor: theme.white,
    borderColor: setBorderColor(error, isCodeFull),
    width: theme.screenWidth / maxLength - 20,
    height: 56,
    borderWidth: 1,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  }),
  inputContainerFocused: (error) => ({
    backgroundColor: theme.white,
    borderColor: error ? theme.red : theme.primary,
  }),
  inputText: {
    ...theme.fontStyle({
      fontSize: 18,
      fontWeight: '700',
      color: theme.primary,
    }),
  },
  label: {
    ...theme.fontStyle({
      fontSize: 14,
      fontWeight: '400',
      color: theme.primary,
    }),
  },
});

// eslint-disable-next-line react/display-name
const FormOneTime = forwardRef(({ label, maxLength, ...restOfProps }, ref) => {
  const [containerIsFocused, setContainerIsFocused] = useState(false);
  const [field, meta] = useField(restOfProps);
  const { isSubmitting, handleChange, handleSubmit } = useFormikContext();

  const error = meta.touched && meta.error;
  const value = field.value || '';

  const codeDigitsArray = new Array(maxLength).fill(0);

  const toDigitInput = (_value, idx) => {
    const emptyInputChar = ' ';
    const digit = value[idx] || emptyInputChar;

    const isCurrentDigit = idx === value.length;
    const isLastDigit = idx === maxLength - 1;
    const isCodeFull = value.length === maxLength;

    const isFocused = isCurrentDigit || (isLastDigit && isCodeFull);

    const containerStyle =
      containerIsFocused && isFocused
        ? {
            ...style.inputContainer(error, isCodeFull, maxLength),
            ...style.inputContainerFocused(error),
          }
        : style.inputContainer(error, isCodeFull, maxLength);

    return (
      <View key={idx} style={containerStyle}>
        <Text style={style.inputText}>{digit}</Text>
      </View>
    );
  };

  const handleOnPress = () => {
    ref?.current?.focus();
    setContainerIsFocused(true);
  };

  const handleOnBlur = () => {
    ref?.current?.blur();
    setContainerIsFocused(false);
    handleSubmit();
  };

  useEffect(() => {
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setContainerIsFocused(false);
      ref?.current?.blur();
    });

    return () => {
      hideSubscription.remove();
    };
  }, []);

  return (
    <>
      {!!label && <Text style={style.label}>{label}</Text>}
      <View style={style.container}>
        <Pressable style={style.inputsContainer} onPress={handleOnPress}>
          {codeDigitsArray.map(toDigitInput)}
        </Pressable>
        <TextInput
          ref={ref}
          disabled={isSubmitting}
          value={value}
          onChangeText={(e) => handleChange(field.name)(e)}
          onSubmitEditing={handleOnBlur}
          keyboardType="number-pad"
          returnKeyType="done"
          textContentType="oneTimeCode"
          maxLength={maxLength}
          style={style.hiddenCodeInput}
        />
      </View>
      {!!error && <FormError error={error} errorWithBackground={false} />}
    </>
  );
});

FormOneTime.propTypes = {
  maxLength: PropTypes.number.isRequired,
  label: PropTypes.string,
};

export default FormOneTime;
