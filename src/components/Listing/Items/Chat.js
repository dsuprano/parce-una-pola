import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { observer } from 'mobx-react-lite';

import styles from './styles';

const ChatItem = ({ chat, onPressItem = null, onPressLongItem = null }) => {
  const { friend, lastMessage } = chat;

  const localPressItem = () => {
    onPressItem(friend);
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={localPressItem}
      onLongPress={onPressLongItem}
      disabled={!onPressItem}
    >
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{friend?.email.charAt(0)}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.userName}>{friend?.email}</Text>
        {lastMessage?.value && (
          <Text style={styles.messageValue}>{`${chat?.isLastMessageMe ? 'Yo: ' : ''}${lastMessage?.value}`}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default observer(ChatItem);
