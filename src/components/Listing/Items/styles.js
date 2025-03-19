import { StyleSheet } from 'react-native';
import theme from 'theme';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    gap: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.tertiary,
  },
  avatarText: {
    ...theme.fontStyle(),
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  userName: {
    ...theme.fontStyle({
      fontWeight: '700',
    }),
  },
  messageValue: {
    ...theme.fontStyle({
      color: theme.text.placeholder,
    }),
  },
});
