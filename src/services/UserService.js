import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
  getDocs,
  collection,
  query,
  where,
} from '@react-native-firebase/firestore';

import ErrorModel from 'models/ErrorModel';
import UserModel from 'models/UserModel';

const db = getFirestore();
const db_users = 'users';

class UserService {
  async createUser(user) {
    const userRef = doc(db, db_users, user.id);

    return setDoc(userRef, {
      id: user.id,
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

  async me(id) {
    try {
      const userRef = doc(db, db_users, id);
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

  async searchUser(params, searchKey, myUID) {
    try {
      const usersRef = collection(db, db_users);
      const q = query(
        usersRef,
        where(searchKey, '>=', params[searchKey]),
        where(searchKey, '<', params[searchKey] + '\uf8ff'),
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        return [];
      }

      return querySnapshot.docs
        .map((doc) => UserModel.fromJson({ ...doc.data(), id: doc.id }))
        .filter((user) => user.id !== myUID);
    } catch (error) {
      throw ErrorModel.fromJson(error);
    }
  }
}

export default UserService;
