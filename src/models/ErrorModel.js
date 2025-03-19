import { t } from 'i18next';
import { makeAutoObservable } from 'mobx';

class ErrorModel {
  errorCode = null;

  errorMessage = null;

  constructor(code, message) {
    this.errorCode = code;
    this.errorMessage = message;

    makeAutoObservable(this, {}, { autoBind: true });
  }

  codeHandler = (code) => {
    switch (code) {
      case 'auth/invalid-email':
        return t('errorModel.error.invalidEmail');
      case 'auth/wrong-password':
        return t('errorModel.error.wrongPassword');
      case 'auth/weak-password':
        return t('errorModel.error.weakPassword');
      case 'auth/user-not-found':
        return t('errorModel.error.userNotFound');
      case 'auth/email-already-in-use':
        return t('errorModel.error.emailAlreadyInUse');
      case 'auth/invalid-credential':
        return t('errorModel.error.invalidCredential');
      default:
        console.error(this.errorCode || this.errorMessage);
        return this.errorMessage;
    }
  };

  get code() {
    return this.errorCode;
  }
  get message() {
    return this.codeHandler(this.errorCode);
  }

  static fromJson({ code, message }) {
    return new ErrorModel(code, message);
  }
}

export default ErrorModel;
