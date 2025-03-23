import { StyleSheet } from 'react-native';
import theme from 'theme';

export default StyleSheet.create({
  badge: {
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: theme.primary,
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    ...theme.fontStyle({
      fontSize: 9,
      fontWeight: '700',
      color: theme.white,
    }),
  },
});
