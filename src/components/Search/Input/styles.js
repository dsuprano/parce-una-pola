import { StyleSheet } from 'react-native';
import theme from 'theme';

export default StyleSheet.create({
  container: {
    marginTop: 0,
    marginBottom: 10,
  },
  searchInputWrapper: {
    flexDirection: 'column',
    justifyContent: 'center',
    minWidth: '100%',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.backgroundSearch,
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,
    height: 50,
    marginHorizontal: 5,
    ...theme.fontStyle({
      color: theme.text.default,
    }),
  },
  placeholderTextColor: theme.iconSearch,
  textAlignCenter: {
    textAlign: 'center',
  },
  searchIcon: {
    color: theme.iconSearch,
    fontSize: 18,
  },
  loading: {
    paddingHorizontal: 10,
  },
});
