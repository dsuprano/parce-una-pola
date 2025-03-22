import React, { memo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import Icon from 'components/ui/Icon';
import styles from './styles';

const GroupItem = memo(({ group, containerStyle = {}, onPressItem = null }) => {
  const { name, createdBy, members } = group;

  const localPressItem = () => {
    if (onPressItem) {
      onPressItem(group);
    }
  };

  return (
    <TouchableOpacity style={[styles.container, containerStyle]} onPress={localPressItem} disabled={!onPressItem}>
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <View style={styles.section}>
          <Icon name="star" style={styles.icon} />
          <Text style={styles.createdBy}>{createdBy?.email}</Text>
        </View>
        <View style={styles.section}>
          <Icon name="account-group" style={styles.icon} />
          <Text style={styles.members}> {members?.length || 0}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
});

export default GroupItem;
