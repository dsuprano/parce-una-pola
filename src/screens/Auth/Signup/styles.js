import { StyleSheet } from 'react-native';
import theme from 'theme';

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: theme.paddingVertical,
  },
  content: {
    flex: 1,
    alignItems: 'center',
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
  containerButtonSubmit: {
    marginTop: 10,
  },
});
