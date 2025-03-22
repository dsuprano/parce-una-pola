import elevation from 'helpers/elevation';
import { StyleSheet } from 'react-native';
import theme from 'theme';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: theme.paddingHorizontal,
    borderBottomWidth: 1,
    borderBottomColor: theme.textInputBorderColor,
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 10,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    ...theme.fontStyle({
      fontSize: 16,
      fontWeight: 'bold',
    }),
  },
  brand: {
    ...theme.fontStyle({
      fontSize: 14,
      color: theme.text.placeholder,
    }),
  },
  price: {
    ...theme.fontStyle({
      fontSize: 14,
      color: theme.green,
      fontWeight: 'bold',
    }),
  },
  stock: {
    ...theme.fontStyle({
      fontSize: 12,
      color: theme.orange,
    }),
  },
  containerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  cantContainer: {
    width: 30,
  },
  cant: {
    ...theme.fontStyle({
      fontSize: 14,
      fontWeight: 'bold',
      textAlign: 'center',
    }),
  },
  button: {
    backgroundColor: theme.primary,
    padding: 8,
    borderRadius: 5,
  },
  icon: {
    color: theme.white,
  },
  buttonText: {
    ...theme.fontStyle({
      color: theme.white,
      fontSize: 14,
    }),
  },
});
5;
