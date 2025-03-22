import { StyleSheet } from 'react-native';
import theme from 'theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutIcon: {
    fontSize: 22,
    color: theme.headerTitleColor,
  },
  containerList: {},
  addButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: theme.primary,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  addIcon: {
    fontSize: 24,
    color: theme.white,
  },
});
