import React from 'react';
import { Dimensions, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const Body = ({ children }) => {
  const { height, width } = Dimensions.get('window');
  const isIos = Platform.OS === 'ios';
  const isNotchIPhone = height >= 812 || width >= 812;
  const verticalOffset = isNotchIPhone ? 60 : 20;

  return (
    <GestureHandlerRootView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'behavior'}
        keyboardVerticalOffset={isIos ? verticalOffset : undefined}
        style={styles.container}
      >
        {children}
      </KeyboardAvoidingView>
    </GestureHandlerRootView>
  );
};

export default Body;
