import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';

import theme from 'theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.primaryBackgroundSplash,
  },
  containerSplash: {
    flex: 1,
    backgroundColor: theme.primaryBackgroundSplash,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.containerSplash}>
        <ActivityIndicator color={theme.primary} />
      </View>
    </View>
  );
};

SplashScreen.propTypes = {
  message: PropTypes.string,
  downloadProgress: PropTypes.string,
};

export default SplashScreen;
