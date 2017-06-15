class Auth {
  constructor(auth) {
    this.auth = auth;
    this.observer(); // start observing when the class is instantiated
  }

  /**
   * create a new user
   * @param  {string} email    email address for user
   * @param  {string} password users' password
   * @return {string}          error message if one
   */
  createUser(email, password) {
    this.auth.createUserWithEmailAndPassword(email, password).catch(function(error) {
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
    this.auth.signInWithEmailAndPassword(email, password).catch(function(error) {
      return errorMessage = error.message;
    });
  }

  /**
   * signout
   */
  signOut() {
    this.auth.signOut().then(function() {
      // Sign-out successful.
    }).catch(function(error) {
      // An error happened.
    });
  }

  /**
   * keep an eye on the current user
   */
  observer() {
    this.auth.onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
      } else {
        // No user is signed in.
      }
    });
  }
}
