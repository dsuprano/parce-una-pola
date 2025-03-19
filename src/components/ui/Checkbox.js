import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, Text } from 'react-native';
import Icon from 'components/ui/Icon';

import theme from 'theme';

const styles = {
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxText: {
    marginLeft: 10,
    ...theme.fontStyle({
      color: theme.mediumGrey,
      fontSize: 16,
      fontWeight: '400',
    }),
  },
  errorText: {
    color: theme.primary,
  },
  iconBaseStyle: {
    fontSize: 20,
    color: theme.textInputBorderColor,
    backgroundColor: 'transparent',
  },
  iconCheck: (checked) => ({
    color: checked ? theme.primary : theme.grey,
  }),
  counter: {
    container: {
      backgroundColor: theme.primary,
      borderRadius: 4,
      position: 'absolute',
      bottom: -7,
      right: -7,
      paddingHorizontal: 6,
      paddingVertical: 2,
      justifyContent: 'center',
      alignItems: 'center',
    },
    value: { fontSize: 10, color: theme.white },
  },
};

const Checkbox = ({
  innerRef,
  label,
  style,
  labelStyle,
  checked,
  setChecked,
  color,
  rounded,
  error,
  leftLabel,
  counter,
}) => {
  const baseColor = style?.color || theme.primary;
  const iconStyle = [styles.iconBaseStyle, { color: checked ? color : baseColor }];

  const Component = setChecked ? TouchableOpacity : View;

  return (
    <Component ref={innerRef} style={[styles.container, style]} onPress={() => setChecked(checked)}>
      {leftLabel && !!label && (
        <Text style={[styles.checkboxText, { flex: 1 }, labelStyle, error && styles.errorText]}>{label}</Text>
      )}
      {rounded ? (
        <Icon
          style={[styles.iconCheck(checked), iconStyle]}
          name={checked ? 'check-circle' : 'checkbox-blank-circle-outline'}
        />
      ) : (
        <Icon
          style={[styles.iconCheck(checked), iconStyle]}
          name={checked ? 'checkbox-marked' : 'checkbox-blank-outline'}
        />
      )}
      {checked && counter && (
        <View style={styles.counter.container}>
          <Text style={styles.counter.value}>{counter}</Text>
        </View>
      )}
      {!leftLabel && !!label && (
        <Text style={[styles.checkboxText, labelStyle, error && styles.errorText]}>{label}</Text>
      )}
    </Component>
  );
};

Checkbox.propTypes = {
  checked: PropTypes.bool.isRequired,
  setChecked: PropTypes.func,
  color: PropTypes.string,
  rounded: PropTypes.bool,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  error: PropTypes.bool,
  leftLabel: PropTypes.bool,
  counter: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  labelStyle: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default Checkbox;
