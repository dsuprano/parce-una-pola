import React, { useCallback, useLayoutEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import { useFocusEffect } from '@react-navigation/native';

import { useStore } from 'providers/StoreProvider';
import routes from 'navigation/routes';

import Icon from 'components/ui/Icon';
import { Listing } from 'components/Listing';
import NoResults from 'components/ui/NoResults';
import GroupItem from 'components/Listing/Items/Group';

import styles from './styles';
import { GROUP_CART_STATUS } from 'models/GroupModel';

const HomeScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const rootStore = useStore();
  const { authStore, groupStore, themeStore } = rootStore;

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

  const onPressNewGroup = () => {
    navigation.navigate(routes.CREATE_GROUP);
  };

  const onPressGroup = (group) => {
    if (group?.status === GROUP_CART_STATUS.OPEN) {
      navigation.navigate(routes.GROUP, { groupId: group.id });
    } else {
      navigation.navigate(routes.CART, { groupId: group.id });
    }
  };

  useFocusEffect(
    useCallback(() => {
      themeStore.initialColors();
    }, [themeStore]),
  );

  return (
    <View style={styles.container}>
      <Listing
        items={groupStore?.list?.groups}
        loading={groupStore?.list?.loading}
        onFetchData={(params) => groupStore.listen(params, authStore?.user)}
        renderItem={({ item }) => <GroupItem group={item} onPressItem={onPressGroup} />}
        emptyComponent={<NoResults title={t('homeScreen.list.notFound')} />}
        contentContainerStyle={styles.containerList}
        itemLayoutHeight={70}
      />

      <TouchableOpacity style={styles.addButton} onPress={onPressNewGroup}>
        <Icon name="account-multiple-plus" style={styles.addIcon} />
      </TouchableOpacity>
    </View>
  );
};

export default observer(HomeScreen);
