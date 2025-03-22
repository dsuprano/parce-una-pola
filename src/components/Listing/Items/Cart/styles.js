import { StyleSheet } from 'react-native';
import theme from 'theme';

export default StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: theme.paddingHorizontal,
    borderBottomWidth: 1,
    borderBottomColor: theme.textInputBorderColor,
    justifyContent: 'center',
    gap: 5,
  },
  info: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 5,
  },
  name: {
    ...theme.fontStyle({
      fontSize: 14,
      fontWeight: '700',
    }),
  },
  addedBy: {
    ...theme.fontStyle({
      fontSize: 14,
      color: theme.text.placeholder,
    }),
  },
  cant: {
    ...theme.fontStyle({
      fontSize: 14,
      fontWeight: 'bold',
      textAlign: 'center',
    }),
  },
  price: {
    ...theme.fontStyle({
      fontSize: 14,
      fontWeight: 'bold',
    }),
  },
});
5;
