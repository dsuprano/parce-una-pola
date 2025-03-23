import React, { useCallback, useEffect, useLayoutEffect, useMemo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';

import { useStore } from 'providers/StoreProvider';
import routes from 'navigation/routes';

import Icon from 'components/ui/Icon';
import { ListingSection } from 'components/ListingSection';
import { BeerItem } from 'components/Listing';
import NoResults from 'components/ui/NoResults';

import styles from './styles';
import GeoDistance from 'components/Geolocation';
import Badge from 'components/Badge';

const GroupScreen = ({ navigation, route }) => {
  const { t } = useTranslation();
  const { groupId } = route.params || {};
  const { authStore, groupStore } = useStore();
  const breweries = useMemo(() => groupStore?.currentGroup?.breweries, [groupStore?.currentGroup?.breweries]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: groupStore?.currentGroup?.name || t('groupScreen.title'),

      headerRight: () =>
        groupStore?.currentGroup && (
          <TouchableOpacity onPress={() => navigation.navigate(routes.CART, { groupId })}>
            <Icon name="cart-outline" style={styles.icon} />
            <Badge count={groupStore?.currentGroup?.totalItemsCart || 0} />
          </TouchableOpacity>
        ),
    });
  }, [navigation, t, groupStore?.currentGroup]);

  const sectionHeader = useCallback((section) => {
    return (
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{section.title}</Text>
        <GeoDistance target={{ latitude: section.latitude, longitude: section.longitude }} />
      </View>
    );
  }, []);

  useEffect(() => {
    if (groupId) {
      groupStore.setCurrentGroup(groupId);
    }

    return () => {
      groupStore.setCurrentGroup(null);
    };
  }, [groupStore?.list?.groups, groupId]);

  if (!groupStore?.currentGroup) {
    return <NoResults title={t('groupScreen.group.notFound')} />;
  }

  return (
    <View style={styles.container}>
      <ListingSection
        items={breweries}
        sectionHeader={(section) => sectionHeader(section)}
        renderItem={({ item }) => <BeerItem beer={item} group={groupStore?.currentGroup} me={authStore?.user} />}
        emptyComponent={<NoResults title={t('groupScreen.list.notFound')} />}
        contentContainerStyle={styles.containerList}
        itemLayoutHeight={80}
      />
    </View>
  );
};

export default observer(GroupScreen);
