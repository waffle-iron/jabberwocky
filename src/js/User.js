class User {
  register() {
    this.getValues('register');
  } 
 
  login() {
    this.getValues('login');
    return firebase.auth().signInWithEmailAndPassword(this.email, this.password).catch(function(error) {
      return errorMessage = error.message;
    });
  } 
 
  logout() { 
    firebase.auth().signOut().then(function() {
      //this.showLogin();
    }).catch(function(error) {
      // An error happened.
    });
  }

  getValues(type) { 
    this.email = document.getElementById(type + '_email__input').value;
    this.password = document.getElementById(type + '_password__input').value;
  }
}
