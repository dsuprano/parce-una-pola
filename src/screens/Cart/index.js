import React, { useEffect, useLayoutEffect } from 'react';
import { View, Text } from 'react-native';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';

import { useStore } from 'providers/StoreProvider';

import { Listing } from 'components/Listing';
import NoResults from 'components/ui/NoResults';
import GroupItem from 'components/Listing/Items/Group';
import CartItem from 'components/Listing/Items/Cart';
import CartButton from 'components/Cart/Button';
import styles from './styles';

const CartScreen = ({ navigation, route }) => {
  const { t } = useTranslation();
  const { authStore, groupStore } = useStore();
  const { groupId } = route.params || {};

  useLayoutEffect(() => {
    navigation.setOptions({
      title: t('cartScreen.title'),
    });
  }, [navigation, t]);

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
      <Listing
        items={groupStore?.currentGroup?.filteredCart}
        headerComponent={<GroupItem group={groupStore?.currentGroup} containerStyle={styles.sectionHeader} />}
        renderItem={({ item }) => <CartItem beer={item} me={authStore?.user} group={groupStore?.currentGroup} />}
        emptyComponent={<NoResults title={t('cartScreen.list.notFound')} />}
        contentContainerStyle={styles.containerList}
        itemLayoutHeight={30}
      />
      <View style={styles.totalContainer}>
        <CartButton group={groupStore?.currentGroup} />
        <Text style={styles.total}>{`Total(${
          groupStore?.currentGroup?.totalItemsCart
        }): $${groupStore?.currentGroup?.totalAmountCart.toFixed(2)}`}</Text>
      </View>
    </View>
  );
};

export default observer(CartScreen);
