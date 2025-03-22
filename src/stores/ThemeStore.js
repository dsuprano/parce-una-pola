import { makeAutoObservable, runInAction } from 'mobx';
import theme from 'theme';

const INITIAL_STATE = {
  statusBarColor: theme.backgroundSafeArea,
  safeAreaTopColor: theme.backgroundSafeArea,
  safeAreaBottomColor: theme.backgroundSafeArea,
};

class ThemeStore {
  statusBarColor = INITIAL_STATE.statusBarColor;

  safeAreaTopColor = INITIAL_STATE.safeAreaTopColor;

  safeAreaBottomColor = INITIAL_STATE.safeAreaBottomColor;

  constructor() {
    makeAutoObservable(this);
  }

  initialColors() {
    runInAction(() => {
      this.statusBarColor = INITIAL_STATE.statusBarColor;
      this.safeAreaTopColor = INITIAL_STATE.safeAreaTopColor;
      this.safeAreaBottomColor = theme.white;
    });
  }
}

export default ThemeStore;
