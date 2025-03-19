import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator, TextInput, View } from 'react-native';

import DeviceInfo from 'helpers/device';
import Icon from 'components/ui/Icon';
import theme from 'theme';
import styles from './styles';

const SearchInput = ({ textInputProps, disabled, handleChange, searchValue }) => {
  const [searchTerm, setSearchTerm] = useState(searchValue);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    setSearchTerm(searchValue);
  }, [searchValue]);

  const setKeyboardType = (type) => {
    if (type === 'email-address' && DeviceInfo.SystemName() === 'Android' && DeviceInfo.SystemVersion() === '10') {
      return 'default';
    }

    return type;
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchInputWrapper}>
        <View style={styles.item}>
          {!!textInputProps?.searchIcon && <Icon name="magnify" style={styles.searchIcon} />}
          <TextInput
            style={[styles.input, textInputProps?.textAlign === 'center' && styles.textAlignCenter]}
            keyboardType={textInputProps?.keyboardType ? setKeyboardType(textInputProps?.keyboardType) : 'default'}
            placeholderTextColor={styles.placeholderTextColor}
            onChangeText={(value) => {
              setSearchTerm(value);
              handleChange(value);
            }}
            onBlur={() => {
              setIsFocused(false);
            }}
            focus={isFocused}
            onFocus={() => {
              setIsFocused(true);
            }}
            textAlignVertical="center"
            autoCapitalize="none"
            disabled={disabled}
            value={searchTerm}
            {...textInputProps}
          />
          {!!textInputProps?.loading && (
            <ActivityIndicator size="small" style={styles.loading} color={theme.primary} />
          )}
          {!!textInputProps?.searchOptionsIcon && <Icon name="tune-vertical" style={styles.searchIcon} />}
        </View>
      </View>
    </View>
  );
};

SearchInput.propTypes = {
  disabled: PropTypes.bool,
  handleChange: PropTypes.func.isRequired,
  searchValue: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  textInputProps: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  value: PropTypes.oneOfType([PropTypes.any]),
};

SearchInput.defaultProps = {
  disabled: false,
  searchValue: '',
  textInputProps: {},
  style: {},
  value: '',
};

export default SearchInput;
