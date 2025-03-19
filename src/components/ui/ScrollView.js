import React from 'react';
import { StyleSheet, ScrollView as RNScrollView } from 'react-native';
import PropTypes from 'prop-types';
import theme from 'theme';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: theme.paddingHorizontal,
  },
});

const ScrollView = ({ contentContainerStyle, children }) => {
  return (
    <RNScrollView
      bounces={false}
      keyboardShouldPersistTaps="always"
      keyboardDismissMode="interactive"
      contentContainerStyle={[styles.container, contentContainerStyle]}
    >
      {children}
    </RNScrollView>
  );
};

ScrollView.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ScrollView;
