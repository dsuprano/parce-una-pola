import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';

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

const SettingFallback = () => {
  return (
    <View style={styles.container}>
      <View style={styles.containerSplash}>
        <ActivityIndicator color={theme.primary} />
      </View>
    </View>
  );
};

export default SettingFallback;
