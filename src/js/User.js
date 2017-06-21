class User {
  register() {
    this.getValues('register');
  } 
 
  login() {
    this.getValues('login');
    console.log(encryption.encrypt(this.email.value, 'test'));
  } 
 
  logout() { 
 
  }

  getValues(type) { 
    this.email = document.getElementById(type + '_email__input');
    this.password = document.getElementById(type + '_password__input');
  }
}
