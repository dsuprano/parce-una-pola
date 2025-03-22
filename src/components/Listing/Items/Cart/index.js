import React, { memo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import styles from './styles';

const CartItem = memo(({ beer, me, group, onPressItem = null }) => {
  const { name, price, cant, addedBy } = beer;
  const isMyBeer = me?.id === addedBy?.id;

  const localPressItem = () => {
    if (onPressItem) {
      onPressItem(group);
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={localPressItem} disabled={!onPressItem}>
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.cant}>{`x${cant}`}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.addedBy}>{`${isMyBeer ? 'Agregada por mi' : `Por: ${addedBy?.email}`}`}</Text>
        <Text style={styles.price}>{`$${(price * cant).toFixed(2)}`}</Text>
      </View>
    </TouchableOpacity>
  );
});

export default CartItem;
