import React, { forwardRef, useState } from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DeviceInfo from 'helpers/device';

import Icon from 'components/ui/Icon';
import FormError from 'components/Form/FormError';
import Br from 'components/ui/Br';

import theme from 'theme';

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  placeholderTextColor: theme.text.placeholder,
  item: (isFocused, isMultiline, lightColor) => ({
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: lightColor ? theme.white : theme.white,
    borderRadius: 12,
    minHeight: 50,
    maxHeight: isMultiline ? 140 : 50,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: isFocused ? theme.textInputBorderColorFocus : theme.textInputBorderColor,
  }),
  input: (isMultiline, textAlign, lightColor) => ({
    flex: 1,
    paddingHorizontal: 16,
    minHeight: 30,
    maxHeight: isMultiline ? 100 : 45,
    textAlign: textAlign || 'left',
    backgroundColor: lightColor ? theme.white : theme.white,
    borderRadius: 12,
    ...theme.fontStyle({
      fontSize: 16,
      fontWeight: '400',
      color: theme.text.default,
    }),
  }),
  successIcon: {
    padding: 5,
    marginLeft: 5,
    marginRight: 5,
    fontSize: 20,
    color: theme.primary,
  },
  suffix: {
    padding: 5,
    marginLeft: 5,
    marginRight: 15,
    ...theme.fontStyle({
      fontSize: 16,
      fontWeight: '400',
      color: theme.primary,
    }),
  },
  prefix: {
    marginLeft: 15,
    ...theme.fontStyle({
      fontSize: 16,
      fontWeight: '400',
      color: theme.primary,
    }),
  },
  secureTextEntry: {
    padding: 5,
    marginLeft: 5,
    marginRight: 5,
  },
  loading: {
    padding: 5,
    marginLeft: 5,
  },
  label: {
    ...theme.fontStyle({
      fontSize: 14,
      color: theme.text.default,
      fontWeight: '400',
    }),
    paddingVertical: 5,
  },
});

const FormInput = forwardRef(
  (
    {
      label,
      submitOnNext,
      secureTextEntry,
      textInputProps,
      disabled,
      handleChange,
      handleBlur,
      handleSubmit,
      value,
      error,
      containerStyle,
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(!secureTextEntry);

    const setKeyboardType = (type) => {
      if (type === 'email-address' && DeviceInfo.SystemName() === 'Android' && DeviceInfo.SystemVersion() === '10') {
        return 'default';
      }

      return type;
    };

    return (
      <View style={[!textInputProps?.noMargin && styles.container, containerStyle]}>
        {!!label && <Text style={styles.label}>{label}</Text>}
        <View style={styles.item(isFocused, textInputProps?.multiline, textInputProps?.lightColor)}>
          {textInputProps?.prefix && <Text style={styles.prefix}>{textInputProps?.prefix}</Text>}
          <TextInput
            keyboardType={textInputProps?.keyboardType ? setKeyboardType(textInputProps?.keyboardType) : 'default'}
            onSubmitEditing={submitOnNext ? handleSubmit : undefined}
            onBlur={(e) => {
              setIsFocused(false);

              handleBlur(e);
            }}
            style={styles.input(textInputProps?.multiline, textInputProps?.textAlign, textInputProps?.lightColor)}
            placeholderTextColor={styles.placeholderTextColor}
            returnKeyType={submitOnNext ? 'send' : undefined}
            numberOfLines={textInputProps?.multiline ? 4 : 1}
            multiline={textInputProps?.multiline}
            secureTextEntry={!showPassword}
            onChangeText={handleChange}
            textAlignVertical={textInputProps?.multiline ? 'top' : 'center'}
            autoCapitalize="sentences"
            editable={!disabled}
            focus={isFocused}
            onFocus={() => {
              setIsFocused(true);
            }}
            value={value}
            ref={ref}
            {...textInputProps}
          />
          {!!textInputProps?.loading && <ActivityIndicator size="small" style={styles.loading} />}
          {!!textInputProps?.suffix && <Text style={styles.suffix}>{textInputProps?.suffix}</Text>}
          {!!textInputProps?.successIcon && !error && value !== '' && (
            <Icon name="check-circle-outline" style={styles.successIcon} />
          )}
          {secureTextEntry && (
            <TouchableOpacity
              style={styles.secureTextEntry}
              onPress={() => {
                setShowPassword(!showPassword);
              }}
            >
              <Icon name={showPassword ? 'eye-off' : 'eye'} size={20} color={theme.primary} />
            </TouchableOpacity>
          )}
        </View>
        {!!error && (
          <>
            <Br marginVertical={1} />
            <FormError error={error} errorWithBackground={textInputProps?.errorWithBackground} />
          </>
        )}
      </View>
    );
  },
);

FormInput.propTypes = {
  label: PropTypes.string,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  submitOnNext: PropTypes.bool,
  textInputProps: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  style: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  disabled: PropTypes.bool,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func,
  handleSubmit: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.any]),
  secureTextEntry: PropTypes.bool,
};

export default FormInput;
