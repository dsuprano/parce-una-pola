import { makeAutoObservable } from 'mobx';

class AuthModel {
  emailVerified = null;

  metadata = {};

  providerData = [];

  id = null;

  isNewUser = null;

  providerId = null;

  constructor(emailVerified, metadata, providerData, id, isNewUser, providerId) {
    this.emailVerified = emailVerified;
    this.metadata = metadata;
    this.providerData = providerData;
    this.id = id;
    this.isNewUser = isNewUser;
    this.providerId = providerId;

    makeAutoObservable(this);
  }

  static fromJson({ emailVerified, metadata, providerData, id }, isNewUser = false, providerId = '') {
    return new AuthModel(emailVerified, metadata, providerData, id, isNewUser, providerId);
  }
}

export default AuthModel;
