import React from 'react';
import { StyleSheet } from 'react-native';
import { SvgCssUri } from 'react-native-svg';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import PropTypes from 'prop-types';

import theme from 'theme';

const svgIcons = {};

const Icon = (props) => {
  const { name = null, uri = null, color = null, size = null, style = {} } = props;

  const flattenedStyle = StyleSheet.flatten(style);

  if (uri) {
    return (
      <SvgCssUri
        fill={color || flattenedStyle?.color || theme.primary}
        width={size || flattenedStyle?.fontSize || 18}
        height={size || flattenedStyle?.fontSize || 18}
        uri={uri}
        {...props}
      />
    );
  }

  if (svgIcons[name]) {
    const SvgIcon = svgIcons[name];
    return (
      <SvgIcon
        {...props}
        color={color || flattenedStyle?.color || theme.primary}
        width={size || flattenedStyle?.fontSize || 18}
        height={size || flattenedStyle?.fontSize || 18}
      />
    );
  }

  return <MaterialDesignIcons {...props} />;
};

Icon.propTypes = {
  name: PropTypes.string,
  uri: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default Icon;
