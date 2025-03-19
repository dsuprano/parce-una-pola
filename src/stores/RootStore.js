import { makeAutoObservable } from 'mobx';
import ThemeStore from './ThemeStore';
import AuthStore from './AuthStore';

class RootStore {
  constructor() {
    this.themeStore = new ThemeStore();
    this.authStore = new AuthStore();

    makeAutoObservable(this);
  }

  async logout() {
    await this.authStore.clear();
  }
}

export default RootStore;
