import {makeAutoObservable} from 'mobx';

class Auth {
  isAuthorizated = false;
  Email = '';

  constructor() {
    makeAutoObservable(this);
  }

  ToAuthorize() {
    this.isAuthorizated = true;
    console.log(this.isAuthorizated);
  }
  ToLogout() {
    this.isAuthorizated = false;
    console.log(this.isAuthorizated);
  }
  ToSetEmail(email) {
    this.Email = email;
  };
}

export default new Auth();
