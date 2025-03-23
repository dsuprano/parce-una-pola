import React, { memo, useEffect } from 'react';
import { View, Text } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

import styles from './styles';

const Badge = ({ count }) => {
  const scale = useSharedValue(1);

  useEffect(() => {
    scale.value = 1.5; // Aumenta el tamaño cuando cambia el valors
    scale.value = withSpring(1, { damping: 4, stiffness: 150 }); // Retorna a tamaño normal con efecto bounce
  }, [count]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  if (count === 0) return null;

  return (
    <Animated.View style={[styles.badge, animatedStyle]}>
      <Text style={styles.badgeText}>{count > 99 ? '99+' : count}</Text>
    </Animated.View>
  );
};

export default memo(Badge);
