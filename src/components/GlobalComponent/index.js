import React from 'react';
import { StatusBar, SafeAreaView, StyleSheet } from 'react-native';
import AppNavigator from 'navigation/AppNavigator';
import { observer } from 'mobx-react-lite';

import Body from 'components/Body';
import { useStore } from 'providers/StoreProvider';

const styles = StyleSheet.create({
  viewTop: {
    flex: 0,
  },
  viewBottom: {
    flex: 1,
  },
});

const GlobalComponent = () => {
  const { themeStore } = useStore();

  return (
    <>
      <SafeAreaView style={[styles.viewTop, { backgroundColor: themeStore.safeAreaTopColor }]} />
      <SafeAreaView style={[styles.viewBottom, { backgroundColor: themeStore.safeAreaBottomColor }]}>
        <Body>
          <StatusBar backgroundColor={themeStore.statusBarColor} barStyle="dark-content" />
          <AppNavigator />
        </Body>
      </SafeAreaView>
    </>
  );
};

export default observer(GlobalComponent);
