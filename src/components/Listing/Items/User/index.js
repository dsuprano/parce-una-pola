import React, { memo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import Icon from 'components/ui/Icon';
import styles from './styles';

const UserItem = memo(({ User, onPressItem = null, selected = false }) => {
  const { email } = User;

  const localPressItem = () => {
    if (onPressItem) {
      onPressItem(User);
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={localPressItem} disabled={!onPressItem}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{email.charAt(0)}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.userName}>{email}</Text>
        {selected && <Icon name="check" style={styles.icon} />}
      </View>
    </TouchableOpacity>
  );
});

export default UserItem;
