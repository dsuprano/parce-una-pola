import { makeAutoObservable, runInAction } from 'mobx';
import { makePersistable } from 'mobx-persist-store';

import UserService from 'services/UserService';

const STORAGE_KEYS = {};

const INITIAL_STATE = {
  isLoading: false,
  search: [],
};

class UserStore {
  isLoading = INITIAL_STATE.isLoading;

  search = INITIAL_STATE.search;

  constructor() {
    makeAutoObservable(this);
    this.userService = new UserService();

    this.loadFromStorage();
  }

  async loadFromStorage() {
    const keys = Object.values(STORAGE_KEYS);
    return makePersistable(this, { name: 'UserStore', properties: keys });
  }

  async searchUser(params, searchKey, myUID) {
    runInAction(() => {
      this.isLoading = true;
    });

    try {
      const data = await this.userService.searchUser(params, searchKey, myUID);

      runInAction(() => {
        this.search = data;
      });
    } catch (err) {
      throw err;
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  async clear() {
    const keys = Object.keys(INITIAL_STATE);

    keys.forEach((key) => {
      runInAction(() => {
        this[key] = INITIAL_STATE[key];
      });
    });
  }
}

export default UserStore;
export { STORAGE_KEYS };
