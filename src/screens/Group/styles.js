import { StyleSheet } from 'react-native';
import theme from 'theme';

export default StyleSheet.create({
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerList: {},
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.primary,
    paddingVertical: 10,
    paddingHorizontal: theme.paddingHorizontal,
  },
  sectionTitle: {
    ...theme.fontStyle({
      fontSize: 16,
      fontWeight: '700',
      color: theme.white,
    }),
  },
  icon: {
    fontSize: 22,
    color: theme.headerTitleColor,
  },
});
