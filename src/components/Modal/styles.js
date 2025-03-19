import { StyleSheet } from 'react-native';
import theme from 'theme';

export default StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleBenefits: {
    ...theme.fontStyle({
      fontSize: 20,
      fontWeight: '700',
      fontFamily: theme.fontFamily,
      color: theme.black,
    }),
  },
  modalContainerBenefit: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 18,
    elevation: 5,
    zIndex: 5,
    width: '80%',
    alignSelf: 'center',
  },
  takePhoto: {
    ...theme.fontStyle({
      fontSize: 16,
      fontWeight: '700',
      fontFamily: theme.fontFamily,
      color: theme.white,
      marginLeft: 16,
      textAlign: 'center',
    }),
  },
  close: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  buttonPickerImg: {
    marginTop: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  pickPhoto: {
    ...theme.fontStyle({
      fontSize: 16,
      fontWeight: '700',
      fontFamily: theme.fontFamily,
      color: theme.primary,
      marginLeft: 16,
    }),
  },
  buttonSelectedImg: {
    backgroundColor: theme.primary,
    height: 56,
    borderRadius: 10,
    marginTop: 36,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  subtitle: {
    ...theme.fontStyle({
      fontSize: 16,
      fontWeight: '400',
      fontFamily: theme.fontFamily,
      color: theme.black,
      marginTop: 5,
    }),
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo gris semitransparente
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: theme.white,
    padding: 20,
    borderRadius: 18,
    elevation: 5,
    zIndex: 5,
    width: '85%',
    alignSelf: 'center',
  },
  button: {
    width: 130,
    alignSelf: 'center',
    marginTop: 20,
  },
  cancelButtonText: {
    color: theme.black,
    fontWeight: '700',
    fontFamily: theme.fontFamily,
    fontSize: 14,
  },
  title: {
    fontSize: 14,
    fontFamily: theme.fontFamily,
    fontWeight: '500',
    textAlign: 'center',
    color: theme.black,
  },
  iconConfirm: {
    marginBottom: 20,
  },
  buttonConfirm: {
    backgroundColor: theme.primary,
    height: 56,
    width: '100%',
    borderRadius: 10,
    marginTop: 36,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
