class Auth {
  constructor(auth) {
    this.user = false;
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
    return this.auth.signInWithEmailAndPassword(email, password).catch(function(error) {
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
    var self = this;
    this.auth.onAuthStateChanged(function(user) {
      if (user) {
        /* TODO: move this-it doesn't belong here. */
        self.user = true;
        // hide login
        let login = document.getElementById('login');
        login.style.display = 'none';
        // show chat
        let chat = document.getElementById('chat');
        let main = document.getElementById('main');
        main.innerHTML = '';
        let clone = document.importNode(chat.content, true);
        main.appendChild(clone);
        let send = document.getElementById('send');
        send.onclick = function() {
          let msgBox = document.getElementById('msg');
          messages.send(msgBox.value);
          msgBox.value = '';
        };
        messages.read('msgs');
      } else {
        self.user = false;
      }
    });
  }
}
