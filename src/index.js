import 'react-native-reanimated';
import 'react-native-gesture-handler';

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { setLocale as yupSetLocale } from 'yup';

import RootStore from 'stores/RootStore';
import StoreProvider from 'providers/StoreProvider';

import yupLocale from 'helpers/yupLocale';
import I18n from 'helpers/i18n';
import StorageHelper from 'helpers/storage';
import layoutAnimation from 'helpers/layoutAnimation';

import GlobalComponent from 'components/GlobalComponent';

StorageHelper.init();

export const rootStore = new RootStore();

I18n.init(rootStore.authStore);
yupSetLocale(yupLocale);
layoutAnimation();

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const App = () => {
  return (
    <View style={styles.container} testID="app-container">
      <StoreProvider value={rootStore}>
        <GlobalComponent />
      </StoreProvider>
    </View>
  );
};

export default App;
