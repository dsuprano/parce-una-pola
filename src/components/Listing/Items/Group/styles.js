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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 5,
  },
  statusContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: 2,
    paddingHorizontal: 10,
  },
  status: {
    ...theme.fontStyle({
      fontSize: 12,
      color: theme.white,
    }),
  },
  info: {
    flex: 1,
    justifyContent: 'center',
    gap: 5,
  },
  name: {
    ...theme.fontStyle({
      fontSize: 16,
      fontWeight: '700',
    }),
  },
  createdBy: {
    ...theme.fontStyle({
      fontSize: 14,
      color: theme.text.placeholder,
    }),
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  icon: {
    fontSize: 14,
  },
  members: {
    ...theme.fontStyle({
      fontSize: 12,
    }),
  },
});
5;
