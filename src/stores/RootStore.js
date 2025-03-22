import { makeAutoObservable } from 'mobx';
import ThemeStore from './ThemeStore';
import AuthStore from './AuthStore';
import UserStore from './UserStore';
import GroupStore from './GroupStore';

class RootStore {
  constructor() {
    this.themeStore = new ThemeStore();
    this.authStore = new AuthStore();
    this.userStore = new UserStore();
    this.groupStore = new GroupStore();

    makeAutoObservable(this);
  }

  async logout() {
    await this.authStore.clear();
  }
}

export default RootStore;
