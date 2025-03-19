import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import theme from 'theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.paddingHorizontal,
  },
});

const LoadingView = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="small" color={theme.primary} />
    </View>
  );
};

export default LoadingView;
