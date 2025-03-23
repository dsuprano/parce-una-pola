import React, { useState, useEffect } from 'react';
import { AppState, Platform, StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react-lite';

import { isBiometricsAvailable, existBiometricKey, biometricPrompt } from 'helpers/biometrics';
import Button from 'components/ui/Button';
import Icon from 'components/ui/Icon';
import theme from 'theme';

import { useStore } from './StoreProvider';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  displayNone: {
    flex: 0,
    display: 'none',
  },
  displayFlex: {
    flex: 1,
    display: 'flex',
  },
  content: {
    flex: 1,
    padding: theme.paddingHorizontal,
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bodyIcon: {
    fontSize: 100,
    marginBottom: 20,
  },
  bodyTitle: {
    ...theme.fontStyle({
      fontSize: 16,
      fontWeight: '700',
      textAlign: 'center',
    }),
  },
  bodyFooter: {
    gap: 10,
  },
});

const BiometricsProvider = ({ children }) => {
  const rootStore = useStore();
  const { authStore } = rootStore;
  const [appState, setAppState] = useState(AppState.currentState);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [blackScreen, setBlackScreen] = useState(false);
  const [biometricsAvailable, setBiometricsAvailable] = useState(false);
  const isConfigured = authStore?.biometricConfigure;
  const showBlockScreen =
    (blackScreen && biometricsAvailable && authStore?.isLoggedIn) ||
    (biometricsAvailable && authStore?.isLoggedIn && !isConfigured);

  const textTitle = !isConfigured ? 'Configura tu biometria para continuar' : 'Usa biometria para desbloquear la app';
  const textButton = !isConfigured ? 'Configurar' : 'Desbloquear';

  const onLogout = async () => {
    try {
      await rootStore.logout();
      setBlackScreen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const checkBiometricsAvailable = async () => {
    const isAvailable = await isBiometricsAvailable();
    setBiometricsAvailable(isAvailable);
    return isAvailable;
  };

  const checkBiometrics = async () => {
    if (authStore?.isLoggedIn && biometricsAvailable) {
      const checkExistBiometricKey = await existBiometricKey();
      if (!checkExistBiometricKey) {
        const responseBiometric = await biometricPrompt(textTitle, 'Cancelar');
        if (responseBiometric) {
          authStore.setBiometricConfigure(responseBiometric);
          setBlackScreen(false);
        }

        authStore.setBiometricPermission(responseBiometric);
        return responseBiometric;
      }
    }
  };

  useEffect(() => {
    checkBiometricsAvailable();

    if (biometricsAvailable && isFirstLoad) {
      if (isConfigured) {
        checkBiometrics();
      }

      setBlackScreen(true);
      setIsFirstLoad(false);
    }

    const handleAppStateChange = (nextAppState) => {
      if (appState.match(/background/) && nextAppState === 'active') {
        checkBiometrics();
      } else if (appState.match(/active/) && nextAppState === 'background') {
        authStore.setBiometricPermission(false);
        setBlackScreen(true);
      }

      setAppState(nextAppState);
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription.remove();
    };
  }, [appState, isFirstLoad, authStore, biometricsAvailable]);

  return (
    <View style={styles.container}>
      <View style={showBlockScreen ? [styles.displayFlex, styles.content] : styles.displayNone}>
        <View style={styles.body}>
          <Icon name={Platform.OS === 'ios' ? 'face-recognition' : 'fingerprint'} style={styles.bodyIcon} />
          <Text style={styles.bodyTitle}>{textTitle}</Text>
        </View>
        <View style={styles.bodyFooter}>
          <Button onPress={() => checkBiometrics()}>{textButton}</Button>
          <Button cancel onPress={onLogout}>
            Cerrar sesión
          </Button>
        </View>
      </View>
      <View style={showBlockScreen ? styles.displayNone : styles.displayFlex}>{children}</View>
    </View>
  );
};

BiometricsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default observer(BiometricsProvider);
