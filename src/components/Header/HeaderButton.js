import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import Icon from 'components/ui/Icon';

const styles = StyleSheet.create({
  touchable: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 3,
    marginHorizontal: 11,
  },
  icon: {
    height: 24,
    width: 24,
    margin: 3,
  },
});

const HeaderButton = ({ onPress, tintColor, style = {}, ...props }) => (
  <TouchableOpacity onPress={onPress} style={styles.touchable}>
    <Icon color={tintColor} size={22} style={[styles.icon, style]} {...props} />
  </TouchableOpacity>
);

HeaderButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  tintColor: PropTypes.string.isRequired,
  style: PropTypes.oneOfType([PropTypes.object]),
};

export default HeaderButton;
