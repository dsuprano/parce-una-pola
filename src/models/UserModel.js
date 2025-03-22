import { makeAutoObservable } from 'mobx';

class UserModel {
  id = null;

  displayName = null;

  email = null;

  photoURL = null;

  phoneNumber = null;

  createdAt = null;

  constructor(id, displayName, email, photoURL, phoneNumber, createdAt) {
    this.id = id;
    this.displayName = displayName;
    this.email = email;
    this.photoURL = photoURL;
    this.phoneNumber = phoneNumber;
    this.createdAt = createdAt;

    makeAutoObservable(this);
  }

  static fromJson({
    id,
    displayName,
    email,
    photoURL,
    phoneNumber,
    createdAt,
  }) {
    return new UserModel(id, displayName, email, photoURL, phoneNumber, createdAt);
  }
}

export default UserModel;
