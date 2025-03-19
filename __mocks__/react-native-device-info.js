jest.mock('react-native-device-info', () => ({
  getSystemName: jest.fn(() => 'MockedOS'),
  getSystemVersion: jest.fn(() => '1.0.0'),
  getUniqueId: jest.fn(() => '12345'),
  getDeviceId: jest.fn(() => 'mocked-device'),
}));
