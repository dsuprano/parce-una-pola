import React, { useLayoutEffect, useMemo } from 'react';
import { View, Text } from 'react-native';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';

import { useStore } from 'providers/StoreProvider';
import { GROUP_CART_STATUS } from 'models/GroupModel';

import { Listing } from 'components/Listing';
import NoResults from 'components/ui/NoResults';
import GroupItem from 'components/Listing/Items/Group';
import CartItem from 'components/Listing/Items/Cart';
import Button from 'components/ui/Button';
import styles from './styles';

const CartScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const { authStore, groupStore } = useStore();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: t('cartScreen.title'),
    });
  }, [navigation, t]);

  const sectionHeader = useMemo(() => {
    return <GroupItem group={groupStore?.currentGroup} containerStyle={styles.sectionHeader} />;
  }, [groupStore?.currentGroup]);

  const changeStatusOrder = (status) => {
    groupStore?.currentGroup?.setStatus(status);
  };

  return (
    <View style={styles.container}>
      <Listing
        items={groupStore?.currentGroup?.filteredCart}
        headerComponent={sectionHeader}
        renderItem={({ item }) => <CartItem beer={item} me={authStore?.user} group={groupStore?.currentGroup} />}
        emptyComponent={<NoResults title={t('cartScreen.list.notFound')} />}
        contentContainerStyle={styles.containerList}
        itemLayoutHeight={30}
      />
      <View style={styles.totalContainer}>
        {groupStore?.currentGroup?.canPlaceOrder && (
          <Button style={styles.button} onPress={() => changeStatusOrder(GROUP_CART_STATUS.CLOSED)}>
            <Text style={styles.buttonText}>{t('cartScreen.button.close')}</Text>
          </Button>
        )}
        {groupStore?.currentGroup?.canCloseOrder && (
          <Button style={styles.button} onPress={() => changeStatusOrder(GROUP_CART_STATUS.DELIVERED)}>
            <Text style={styles.buttonText}>{t('cartScreen.button.delivered')}</Text>
          </Button>
        )}
        <Text style={styles.total}>{`Total(${
          groupStore?.currentGroup?.totalItemsCart
        }): $${groupStore?.currentGroup?.totalAmountCart.toFixed(2)}`}</Text>
      </View>
    </View>
  );
};

export default observer(CartScreen);
