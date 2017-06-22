class User {
  register() {
    this.getValues('register');
    firebase.auth().createUserWithEmailAndPassword(this.email, this.password).catch(function(error) {
      return error.message;
    });
  } 
 
  login() {
    this.getValues('login');
    return firebase.auth().signInWithEmailAndPassword(this.email, this.password).catch(function(error) {
      return errorMessage = error.message;
    });
  } 
 
  logout() { 
    firebase.auth().signOut().then(function() {
      location.reload(true);
    }).catch(function(error) {
      // An error happened.
    });
  }

  getValues(type) { 
    this.email = document.getElementById(type + '_email__input').value;
    this.password = document.getElementById(type + '_password__input').value;
  }
}
