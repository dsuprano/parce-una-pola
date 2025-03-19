import { Platform, UIManager, LogBox } from 'react-native';

const layoutAnimation = () => {
  LogBox.ignoreLogs(['Non-serializable values were found in the navigation state']);

  if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
};

export default layoutAnimation;
