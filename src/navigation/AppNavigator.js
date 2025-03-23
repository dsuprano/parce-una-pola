import React, { useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { NavigationContainer } from '@react-navigation/native';

import AuthNavigator from 'navigation/AuthNavigator';
import GuestNavigator from 'navigation/GuestNavigator';

import BiometricsProvider from 'providers/BiometricsProvider';
import { useStore } from 'providers/StoreProvider';
import NavigationHelper from 'helpers/navigation';

import SplashScreen from 'components/Splash/SplashScreen';
import SplashFallback from 'components/Splash/SplashFallback';
import DeepLinking from './DeepLinking';

const AppNavigator = () => {
  const { authStore } = useStore();
  const routeNameRef = useRef();
  NavigationHelper.setRouteNameRef(routeNameRef);

  const renderNavigator = () => {
    if (!authStore.isLoggedIn) {
      return <GuestNavigator />;
    } else {
      return <AuthNavigator />;
    }
  };

  if (authStore.isLoaded) {
    return (
      <NavigationContainer
        ref={NavigationHelper.navigationRef}
        linking={DeepLinking}
        onReady={NavigationHelper.onReadyNavigator}
        onStateChange={NavigationHelper.onNavigationStateChange}
        fallback={<SplashFallback />}
      >
          <BiometricsProvider>{renderNavigator()}</BiometricsProvider>
      </NavigationContainer>
    );
  }

  return <SplashScreen />;
};

export default observer(AppNavigator);
