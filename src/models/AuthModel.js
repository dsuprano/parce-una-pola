import { makeAutoObservable } from 'mobx';

class AuthModel {
  emailVerified = null;

  metadata = {};

  providerData = [];

  uid = null;

  isNewUser = null;

  providerId = null;

  constructor(emailVerified, metadata, providerData, uid, isNewUser, providerId) {
    this.emailVerified = emailVerified;
    this.metadata = metadata;
    this.providerData = providerData;
    this.uid = uid;
    this.isNewUser = isNewUser;
    this.providerId = providerId;

    makeAutoObservable(this);
  }

  static fromJson({ emailVerified, metadata, providerData, uid }, isNewUser = false, providerId = '') {
    return new AuthModel(emailVerified, metadata, providerData, uid, isNewUser, providerId);
  }
}

export default AuthModel;
