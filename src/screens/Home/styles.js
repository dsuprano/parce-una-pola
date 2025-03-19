import { StyleSheet } from 'react-native';
import theme from 'theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: theme.text.default,
  },
  logoutIcon: {
    fontSize: 22,
    color: theme.headerTitleColor,
  },
});
