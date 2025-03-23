import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { observer } from 'mobx-react-lite';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, interpolateColor } from 'react-native-reanimated';

import { GROUP_CART_STATUS_COLOR, GROUP_CART_STATUS_TEXT } from 'models/GroupModel';
import Icon from 'components/ui/Icon';
import styles from './styles';

const GroupItem = observer(({ group, containerStyle = {}, onPressItem = null }) => {
  const { name, createdBy, members, status, totalItemsCart } = group;
  const colorValue = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        colorValue.value,
        Object.keys(GROUP_CART_STATUS_COLOR).map((_, index) => index),
        Object.values(GROUP_CART_STATUS_COLOR),
      ),
    };
  });

  const localPressItem = () => {
    if (onPressItem) {
      onPressItem(group);
    }
  };

  useEffect(() => {
    colorValue.value = withTiming(Object.keys(GROUP_CART_STATUS_COLOR).indexOf(status), { duration: 500 });
  }, [status]);

  return (
    <TouchableOpacity style={[styles.container, containerStyle]} onPress={localPressItem} disabled={!onPressItem}>
      <View style={styles.info}>
        <View style={styles.header}>
          <Text style={styles.name}>{name}</Text>
          <Animated.View style={[styles.statusContainer, animatedStyle]}>
            <Text style={styles.status}>{GROUP_CART_STATUS_TEXT[status]}</Text>
          </Animated.View>
        </View>
        <View style={styles.section}>
          <Icon name="star" style={styles.icon} />
          <Text style={styles.createdBy}>{createdBy?.email}</Text>
        </View>
        <View style={styles.section}>
          <Icon name="account-group" style={styles.icon} />
          <Text style={styles.members}> {members?.length || 0}</Text>
          <Icon name="glass-mug" style={styles.icon} />
          <Text style={styles.members}> {totalItemsCart || 0}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
});

export default GroupItem;
