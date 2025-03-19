import { getFirestore, doc, setDoc, getDoc, serverTimestamp } from '@react-native-firebase/firestore';

import ErrorModel from 'models/ErrorModel';
import UserModel from 'models/UserModel';

const db = getFirestore();
const db_users = 'users';

class UserService {
  async createUser(user) {
    const userRef = doc(db, db_users, user.uid);

    return setDoc(userRef, {
      uid: user.uid,
      displayName: user?.displayName || '',
      email: user.email,
      photoURL: user?.photoURL || '',
      phoneNumber: user?.phoneNumber || '',
      createdAt: serverTimestamp(),
    })
      .then()
      .catch((error) => {
        throw ErrorModel.fromJson(error);
      });
  }

  async me(uid) {
    try {
      const userRef = doc(db, db_users, uid);
      const userSnap = await getDoc(userRef);
      const exists = userSnap.exists;

      if (!exists) {
        return null;
      }

      return { user: UserModel.fromJson(userSnap.data()) };
    } catch (error) {
      throw ErrorModel.fromJson(error);
    }
  }
}

export default UserService;
