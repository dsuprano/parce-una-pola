import { StyleSheet } from 'react-native';
import theme from 'theme';

export default StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  distance: {
    ...theme.fontStyle({
      fontSize: 12,
      color: theme.white,
    }),
  },
});
