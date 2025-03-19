import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

function App(): React.JSX.Element {
  return (
    <View style={styles.container} testID="app-container">
      <Text style={styles.text}>Parce, una pola</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#000',
  },
});

export default App;
