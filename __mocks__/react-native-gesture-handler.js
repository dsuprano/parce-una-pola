jest.mock('react-native-gesture-handler', () => ({
  Swipeable: jest.fn(),
  DrawerLayout: jest.fn(),
  State: {},
  GestureHandlerRootView: jest.fn().mockImplementation(({ children }) => children),
}));
