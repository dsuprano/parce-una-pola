import React, { forwardRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useField, useFormikContext } from 'formik';
import { Dropdown } from 'react-native-element-dropdown';

import Br from 'components/ui/Br';
import theme from 'theme';
import FormError from './FormError';

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  label: {
    ...theme.fontStyle({
      fontSize: 14,
      fontWeight: '400',
      color: theme.text.default,
    }),
    marginBottom: 5,
  },
  dropdown: (isFocused) => ({
    height: 50,
    borderWidth: 1,
    borderRadius: 12,
    paddingLeft: 16,
    paddingRight: 10,
    borderColor: isFocused ? theme.textInputBorderColorFocus : theme.textInputBorderColor,
  }),
  placeholderStyle: {
    ...theme.fontStyle({
      fontWeight: '400',
      color: theme.text.placeholder,
    }),
  },
  selectedTextStyle: {
    ...theme.fontStyle({
      fontWeight: '400',
      color: theme.text.default,
    }),
  },
  inputSearchStyle: {
    ...theme.fontStyle({
      fontWeight: '400',
      color: theme.text.default,
    }),
  },
  iconStyle: {
    width: 20,
    height: 20,
    color: theme.primary,
  },
});

const FormDropdown = forwardRef(
  (
    {
      label,
      placeholder,
      searchPlaceholder,
      withSearch = false,
      options = [],
      fieldKey = 'label',
      valueKey = 'value',
      ...restOfProps
    },
    ref,
  ) => {
    const [field, meta] = useField(restOfProps);
    const { setFieldValue } = useFormikContext();
    const [isFocus, setIsFocus] = useState(false);

    const error = meta.touched && meta.error;
    const value = field.value || '';

    return (
      <View style={styles.container}>
        {label && <Text style={styles.label}>{label}</Text>}

        <Dropdown
          ref={ref}
          search={withSearch}
          value={value}
          data={options}
          maxHeight={200}
          labelField={fieldKey}
          valueField={valueKey}
          placeholder={!isFocus ? placeholder : '...'}
          searchPlaceholder={searchPlaceholder}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => {
            setFieldValue(field.name, item[valueKey]);
            setIsFocus(false);
          }}
          style={styles.dropdown(isFocus)}
          placeholderStyle={styles.placeholderStyle}
          searchPlaceholderTextColor={styles.placeholderStyle.color}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          itemTextStyle={styles.selectedTextStyle}
          iconColor={theme.primary}
          dropdownPosition="auto"
          {...restOfProps}
        />

        <Br marginVertical={1} />
        {!!error && <FormError error={error} />}
      </View>
    );
  },
);

export default FormDropdown;
