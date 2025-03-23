import { StyleSheet } from 'react-native';
import theme from 'theme';

export default StyleSheet.create({
  button: {
    backgroundColor: theme.white,
  },
  buttonText: {
    ...theme.fontStyle({
      fontWeight: 'bold',
    }),
  },
});
