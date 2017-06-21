class User {
  register() {
    this.getValues('register');
  } 
 
  login() {
    this.getValues('login'); 
  } 
 
  logout() { 
 
  }

  getValues(type) { 
    this.email = document.getElementById(type + '_email__input'); 
    this.password = document.getElementById(type + '_password__input'); 
  }
}
