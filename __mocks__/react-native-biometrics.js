class MockReactNativeBiometrics {
  async isSensorAvailable() {
    return { available: true, biometryType: 'TouchID' };
  }

  async createSignature() {
    return { success: true, signature: 'mock-signature' };
  }

  async deleteKeys() {
    return { keysDeleted: true };
  }

  async createKeys() {
    return { publicKey: 'mock-public-key' };
  }

  async biometricKeysExist() {
    return { keysExist: true };
  }

  async simplePrompt() {
    return { success: true };
  }
}

export default MockReactNativeBiometrics;

jest.mock('react-native-biometrics', () => {
  return jest.fn().mockImplementation(() => new MockReactNativeBiometrics());
});
