import { StyleSheet } from 'react-native';
import theme from 'theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionHeader: {
    backgroundColor: theme.backgroundHeader,
  },
  containerList: {},
  totalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: theme.primary,
    padding: theme.paddingHorizontal,
  },
  button: {
    backgroundColor: theme.white,
  },
  buttonText: {
    ...theme.fontStyle({
      fontWeight: 'bold',
    }),
  },
  total: {
    flex: 1,
    ...theme.fontStyle({
      textAlign: 'right',
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.white,
    }),
  },
});
