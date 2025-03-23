import uuid from 'react-native-uuid';
import {
  getFirestore,
  serverTimestamp,
  collection,
  query,
  where,
  onSnapshot,
  doc,
  orderBy,
  deleteDoc,
  setDoc,
  getDoc,
  updateDoc,
} from '@react-native-firebase/firestore';
import _ from 'lodash';

import ErrorModel from 'models/ErrorModel';
import GroupModel, { GROUP_CART_STATUS } from 'models/GroupModel';
import breweries from './Metadata/Breweries';

const db = getFirestore();
const db_groups = 'groups';

class GroupService {
  async listen(params, me, callback) {
    try {
      const groupsRef = collection(db, db_groups);
      const q = query(groupsRef, where('members', 'array-contains', me.id), orderBy('createdAt', 'desc'));

      return onSnapshot(q, async (snapshot) => {
        let groups = [];

        if (snapshot.empty) {
          callback(groups);
          return;
        }

        groups = snapshot.docs.map((doc) => GroupModel.fromJson({ id: doc.id, breweries, ...doc.data() }, this, me));

        callback(groups);
      });
    } catch (error) {
      throw ErrorModel.fromJson(error);
    }
  }

  async openGroup(me, name, members) {
    try {
      const newGroup = GroupModel.fromJson(
        {
          id: uuid.v4(),
          name,
          members,
          createdBy: { id: me.id, email: me.email },
          createdAt: serverTimestamp(),
          breweries,
          status: GROUP_CART_STATUS.OPEN,
          cart: [],
        },
        me,
        this,
      );

      return newGroup;
    } catch (error) {
      throw ErrorModel.fromJson(error);
    }
  }

  async setGroup(group) {
    try {
      const groupRef = doc(db, db_groups, group.id);

      await setDoc(groupRef, group);

      return true;
    } catch (error) {
      throw ErrorModel.fromJson(error);
    }
  }

  async changeGroupStatus(groupId, status) {
    try {
      const groupRef = doc(db, db_groups, groupId);

      return updateDoc(groupRef, { status });
    } catch (error) {
      throw ErrorModel.fromJson(error);
    }
  }

  async syncCart(groupId, cart, me) {
    try {
      const groupRef = doc(db, db_groups, groupId);
      const groupSnapshot = await getDoc(groupRef);

      if (groupSnapshot.exists) {
        let currentCart = _.unionBy(cart, groupSnapshot.data().cart || [], 'id');
        currentCart = currentCart.filter((item) => item.cant > 0);

        await updateDoc(groupRef, { cart: currentCart });
      }
    } catch (error) {
      throw ErrorModel.fromJson(error);
    }
  }

  async deleteGroup(groupId) {
    try {
      const groupRef = doc(db, db_groups, groupId);

      return deleteDoc(groupRef);
    } catch (error) {
      throw ErrorModel.fromJson(error);
    }
  }
}

export default GroupService;
