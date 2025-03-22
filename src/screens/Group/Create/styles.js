import { StyleSheet } from 'react-native';
import theme from 'theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.paddingHorizontal,
  },
  containerLabel: {
    marginBottom: 10,
  },
  contentContainerStyle: {
    width: '100%',
  },
  label: {
    ...theme.fontStyle({
      fontSize: 14,
    }),
  },
  containerButton: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  text: {
    ...theme.fontStyle({
      fontSize: 16,
    }),
  },
  button: {
    width: '100%',
  },
});
