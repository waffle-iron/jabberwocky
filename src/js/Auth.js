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

  signOut() {}

  observer() {}
}
