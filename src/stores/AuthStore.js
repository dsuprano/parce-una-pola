import { makeAutoObservable, runInAction } from 'mobx';
import { makePersistable } from 'mobx-persist-store';

import AuthService from 'services/AuthService';
import UserService from 'services/UserService';

const STORAGE_KEYS = {
  TOKEN: 'token',
  AUTH: 'auth',
  USER: 'user',
  LANG: 'lang',
};

const INITIAL_STATE = {
  isLoading: false,
  token: null,
  auth: null,
  user: null,
  lang: 'es',
};

class AuthStore {
  isLoaded = false;

  isLoading = INITIAL_STATE.isLoading;

  token = INITIAL_STATE.token;

  auth = INITIAL_STATE.auth;

  user = INITIAL_STATE.user;

  lang = INITIAL_STATE.lang;

  constructor() {
    makeAutoObservable(this);
    this.authService = new AuthService();
    this.userService = new UserService();

    this.loadFromStorage()
      .then(() => {
        if (this.isLoggedIn) {
          this.loadFromBackend();
        } else {
          this.isLoaded = true;
        }
      })
      .catch(() => {
        runInAction(() => {
          this.isLoaded = true;
        });
      });
  }

  get isLoggedIn() {
    return !!this.token;
  }

  async loadFromStorage() {
    const keys = Object.values(STORAGE_KEYS);
    return makePersistable(this, { name: 'AuthStore', properties: keys });
  }

  async loadFromBackend() {
    try {
      const user = await this.userService.me(this.user.id);

      if (user) {
        this.initLogin(user);
        return;
      }

      const authUser = await this.authService.me();

      if (authUser) {
        this.initLogin(authUser);
        return;
      }

      this.clear();
    } catch (e) {
      this.clear();
    } finally {
      runInAction(() => {
        this.isLoaded = true;
      });
    }
  }

  initLogin(data) {
    const keys = Object.values(STORAGE_KEYS);

    keys.forEach((key) => {
      if (data[key]) {
        runInAction(() => {
          this[key] = data[key];
        });
      }
    });
  }

  async login(email, password) {
    try {
      const data = await this.authService.login(email, password);

      return this.initLogin(data);
    } catch (err) {
      throw err;
    }
  }

  async signup(email, password) {
    try {
      const data = await this.authService.signup(email, password);
      await this.userService.createUser(data.user);

      return this.initLogin(data);
    } catch (err) {
      throw err;
    }
  }

  async clear() {
    try {
      await this.authService.logout();

      const keys = Object.keys(INITIAL_STATE);

      keys.forEach((key) => {
        runInAction(() => {
          this[key] = INITIAL_STATE[key];
        });
      });
    } catch (err) {
      throw err;
    }
  }
}

export default AuthStore;
export { STORAGE_KEYS };
