import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';

const rnBiometrics = new ReactNativeBiometrics();
let isBiometricPromptActive = false;

const isBiometricsAvailable = async () => {
  try {
    const { available, biometryType } = await rnBiometrics.isSensorAvailable();

    return available && biometryType in BiometryTypes;
  } catch (e) {
    return false;
  }
};

const signatureBiometric = async (promptMessage, payload, cancelButtonText = 'Cancelar') => {
  try {
    const { success, signature } = await rnBiometrics.createSignature({ promptMessage, payload, cancelButtonText });

    return { success, signature };
  } catch (e) {
    return false;
  }
};

const deleteBiometricKey = async () => {
  try {
    const { keysDeleted } = await rnBiometrics.deleteKeys();
    return keysDeleted;
  } catch (e) {
    return false;
  }
};

const createBiometricKey = async () => {
  try {
    const { publicKey } = await rnBiometrics.createKeys();
    return publicKey;
  } catch (e) {
    return false;
  }
};

const existBiometricKey = async () => {
  try {
    const { keysExist } = await rnBiometrics.biometricKeysExist();
    return keysExist;
  } catch (e) {
    return false;
  }
};

const biometricPrompt = async (promptMessage, cancelButtonText = 'Cancelar') => {
  try {
    const { success } = await rnBiometrics.simplePrompt({ promptMessage, cancelButtonText });

    return success;
  } catch (e) {
    return false;
  }
};

const checkBiometrics = async (authStore) => {
  const { isLoggedIn, biometricConfigure } = authStore;

  const textTitle = !biometricConfigure
    ? 'Configura tu biometria para continuar'
    : 'Usa biometria para desbloquear la app';

  if (isLoggedIn && !isBiometricPromptActive) {
    const isAvailable = await isBiometricsAvailable();
    if (isAvailable) {
      const checkExistBiometricKey = await existBiometricKey();
      if (!checkExistBiometricKey) {
        if (biometricConfigure) {
          isBiometricPromptActive = true;
          const responseBiometric = await biometricPrompt(textTitle, 'Cancelar');
          isBiometricPromptActive = false;

          if (responseBiometric) {
            authStore.setBiometricConfigure(responseBiometric);
            authStore.decryptingData(responseBiometric);
          } else {
            authStore.setBiometricPermission(responseBiometric);
          }

          return responseBiometric;
        }

        return false;
      }
    }
  }
};

export {
  isBiometricsAvailable,
  signatureBiometric,
  deleteBiometricKey,
  createBiometricKey,
  existBiometricKey,
  biometricPrompt,
  checkBiometrics,
};
