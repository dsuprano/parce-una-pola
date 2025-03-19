import { makeAutoObservable } from 'mobx';

class UserModel {
  uid = null;

  displayName = null;

  email = null;

  photoURL = null;

  phoneNumber = null;

  createdAt = null;

  constructor(uid, displayName, email, photoURL, phoneNumber, createdAt) {
    this.uid = uid;
    this.displayName = displayName;
    this.email = email;
    this.photoURL = photoURL;
    this.phoneNumber = phoneNumber;
    this.createdAt = createdAt;

    makeAutoObservable(this);
  }

  static fromJson({
    uid,
    displayName,
    email,
    photoURL,
    phoneNumber,
    createdAt,
  }) {
    return new UserModel(uid, displayName, email, photoURL, phoneNumber, createdAt);
  }
}

export default UserModel;
