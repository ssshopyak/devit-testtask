import {makeAutoObservable} from 'mobx';

class Auth {
  isAuthorizated = false;
  Email = null;

  constructor() {
    makeAutoObservable(this);
  }

  ToAuthorize() {
    this.isAuthorizated = true;
  }
  ToLogout() {
    this.isAuthorizated = false;
  }
  ToSetEmail(email) {
    this.Email = email;
    console.log(this.Email + ' from mobx');
  };
}

export default new Auth();
