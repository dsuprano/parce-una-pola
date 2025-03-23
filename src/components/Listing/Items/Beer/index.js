import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { observer } from 'mobx-react-lite';

import { GROUP_CART_STATUS } from 'models/GroupModel';
import Icon from 'components/ui/Icon';
import styles from './styles';

const BeerItem = observer(({ beer, group, me }) => {
  const { name, brand, image, price, totalStock, cant } = beer;

  const onPressAdd = () => {
    group.addToGroupCart(beer, me);
  };

  const onPressRemove = () => {
    group.removeFromGroupCart(beer, me);
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.brand}>{brand}</Text>
        <Text style={styles.price}>${price.toFixed(2)}</Text>
        <Text style={styles.stock}>{`Stock: ${totalStock}`}</Text>
      </View>
      <View style={styles.containerButtons}>
        {group?.status === GROUP_CART_STATUS.OPEN && (
          <TouchableOpacity style={styles.button} onPress={onPressRemove}>
            <Icon name="minus" style={styles.icon} />
          </TouchableOpacity>
        )}
        <View style={styles.cantContainer}>
          <Text style={styles.cant}>{cant}</Text>
        </View>
        {group?.status === GROUP_CART_STATUS.OPEN && (
          <TouchableOpacity style={styles.button} onPress={onPressAdd}>
            <Icon name="plus" style={styles.icon} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
});

export default BeerItem;
