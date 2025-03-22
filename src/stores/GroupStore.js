import { makeAutoObservable, runInAction } from 'mobx';
import { makePersistable } from 'mobx-persist-store';
import _ from 'lodash';

import GroupService from 'services/GroupService';
import { GROUP_CART_STATUS } from 'models/GroupModel';

const STORAGE_KEYS = {};

const INITIAL_STATE = {
  list: { groups: [], loading: true },
  currentGroup: null,
  subscription: null,
};

class GroupStore {
  list = INITIAL_STATE.list;

  currentGroup = INITIAL_STATE.currentGroup;

  subscription = INITIAL_STATE.subscription;

  constructor() {
    makeAutoObservable(this);
    this.groupService = new GroupService();

    this.loadFromStorage();
  }

  async loadFromStorage() {
    const keys = Object.values(STORAGE_KEYS);
    return makePersistable(this, { name: 'GroupStore', properties: keys });
  }

  async listen(params, me) {
    this.list.loading = true;

    try {
      this.subscription = this.groupService.listen(params, me, (groupList) => {
        runInAction(() => {
          this.list.groups = _.unionBy(groupList, this.list.groups, 'id');
          this.list.groups = _.filter(this.list.groups, (group) => _.some(groupList, { id: group.id }));
          this.list.loading = false;
        });
      });
    } catch (err) {
      runInAction(() => {
        this.list.loading = false;
      });

      throw err;
    }
  }

  async openGroup(me, name, members) {
    try {
      // TODO: Descomentar si solo queremos 1 grupo por miembros iguales
      // const group = this.list.groups.find((group) => members.every((user) => group?.members.includes(user)));
      const group = false;

      if (!group) {
        const newGroup = await this.groupService.openGroup(me, name, members);

        runInAction(() => {
          this.list.groups = [newGroup, ...this.list.groups];
        });

        return this.groupService.setGroup({
          id: newGroup.id,
          name: newGroup.name,
          members: newGroup.members,
          createdBy: newGroup.createdBy,
          createdAt: newGroup.createdAt,
          status: GROUP_CART_STATUS.OPEN,
          cart: [],
        });
      }
    } catch (err) {
      throw err;
    }
  }

  setCurrentGroup(groupId) {
    const findGroup = this.list.groups.find((g) => g.id === groupId);

    if (findGroup) {
      runInAction(() => {
        this.currentGroup = findGroup;
      });
    }
  }

  async stopListenGroups() {
    if (this.subscription) {
      await this.subscription();

      runInAction(() => {
        this.subscription = null;
      });
    }
  }

  async deleteGroup(group) {
    try {
      await this.groupService.deleteGroup(group?.id);
    } catch (err) {
      throw err;
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

export default GroupStore;
export { STORAGE_KEYS };
