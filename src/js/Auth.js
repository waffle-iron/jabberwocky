import * as firebase from 'firebase';

class Auth {
  /**
   * create a new user
   * @param  {string} email    email address for user
   * @param  {string} password users' password
   * @return {string}          error message if one
   */
  createUser(email, password) {
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      return error.message;
    });
  }

  /**
   * sign-in the user
   * @param  {string} email    email address for user
   * @param  {string} password users' password
   * @return {string}          error message
   */
  signIn(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      return errorMessage = error.message;
    });
  }

  signOut() {
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
    }).catch(function(error) {
      // An error happened.
    });
  }

  observer() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
      } else {
        // No user is signed in.
      }
    });
  }
}
