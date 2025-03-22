import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '@react-native-firebase/auth';

import ErrorModel from 'models/ErrorModel';
import AuthModel from 'models/AuthModel';
import UserModel from 'models/UserModel';

const auth = getAuth();

class AuthService {
  async me() {
    const user = auth.currentUser;

    if (!user) {
      return null;
    }

    return { user: UserModel.fromJson({...user._user, id: user._user.uid}) };
  }

  async signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
      .then(({ user, additionalUserInfo }) => ({
        auth: AuthModel.fromJson(user._user, additionalUserInfo.isNewUser, additionalUserInfo.providerId),
        user: UserModel.fromJson({...user._user, id: user._user.uid}),
        token: user._user.uid,
      }))
      .catch((error) => {
        throw ErrorModel.fromJson(error);
      });
  }

  async login(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
      .then(({ user, additionalUserInfo }) => {
        return {
          auth: AuthModel.fromJson(user._user, additionalUserInfo.isNewUser, additionalUserInfo.providerId),
          user: UserModel.fromJson({...user._user, id: user._user.uid}),
          token: user._user.uid,
        };
      })
      .catch((error) => {
        throw ErrorModel.fromJson(error);
      });
  }

  async logout() {
    return signOut(auth)
      .then()
      .catch((error) => {
        throw ErrorModel.fromJson(error);
      });
  }
}

export default AuthService;
