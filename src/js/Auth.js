class Auth {
  constructor(auth, showLogin, showChat) {
    this.user = false;
    this.auth = auth;
    this.showLogin = showLogin;
    this.showChat = showChat;
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
    return this.auth.signInWithEmailAndPassword(email, password).catch(function(error) {
      return errorMessage = error.message;
    });
  }

  /**
   * signout
   */
  signOut() {
    this.auth.signOut().then(function() {
      this.showLogin();
    }).catch(function(error) {
      // An error happened.
    });
  }
}
