jest.mock('react-native-snackbar', () => ({
  show: jest.fn(),
  LENGTH_SHORT: 1000,
  LENGTH_LONG: 2000,
  LENGTH_INDEFINITE: -1,
}));
