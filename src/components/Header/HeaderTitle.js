import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';

import theme from 'theme';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    ...theme.fontStyle({
      fontWeight: '700',
      fontSize: 22,
    }),
  },
  subtitle: {
    ...theme.fontStyle({
      fontSize: 14,
    }),
  },
});

const HeaderTitle = ({
  title,
  subtitle = null,
  titleColor = theme.headerTitleColor,
  subtitleColor = theme.headerSubtitleColor,
  containerStyle = {},
}) => (
  <View style={[styles.container, containerStyle]}>
    <Text style={[styles.title, { color: titleColor }]} numberOfLines={1}>
      {title}
    </Text>
    {!!subtitle && <Text style={[styles.subtitle, { color: subtitleColor }]}>{subtitle}</Text>}
  </View>
);
HeaderTitle.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  titleColor: PropTypes.string,
  subtitleColor: PropTypes.string,
  containerStyle: PropTypes.oneOfType([PropTypes.object]),
};

export default HeaderTitle;
