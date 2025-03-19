import React, { useLayoutEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';

import { useStore } from 'providers/StoreProvider';
import Icon from 'components/ui/Icon';

import styles from './styles';

const HomeScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const rootStore = useStore();

  useLayoutEffect(() => {
    navigation.setOptions({
      hideBackButton: true,
      title: t('homeScreen.title'),
      headerRight: () => (
        <TouchableOpacity onPress={() => rootStore.logout()}>
          <Icon name="logout" style={styles.logoutIcon} />
        </TouchableOpacity>
      ),
    });
  }, [navigation, t]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{t('homeScreen.title')}</Text>
    </View>
  );
};

export default observer(HomeScreen);
