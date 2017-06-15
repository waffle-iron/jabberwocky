"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Auth = function () {
  function Auth(auth) {
    _classCallCheck(this, Auth);

    this.auth = auth;
    this.observer(); // start observing when the class is instantiated
  }

  /**
   * create a new user
   * @param  {string} email    email address for user
   * @param  {string} password users' password
   * @return {string}          error message if one
   */


  _createClass(Auth, [{
    key: "createUser",
    value: function createUser(email, password) {
      this.auth.createUserWithEmailAndPassword(email, password).catch(function (error) {
        return error.message;
      });
    }

    /**
     * sign-in the user
     * @param  {string} email    email address for user
     * @param  {string} password users' password
     * @return {string}          error message
     */

  }, {
    key: "signIn",
    value: function signIn(email, password) {
      this.auth.signInWithEmailAndPassword(email, password).catch(function (error) {
        return errorMessage = error.message;
      });
    }

    /**
     * signout
     */

  }, {
    key: "signOut",
    value: function signOut() {
      this.auth.signOut().then(function () {
        // Sign-out successful.
      }).catch(function (error) {
        // An error happened.
      });
    }

    /**
     * keep an eye on the current user
     */

  }, {
    key: "observer",
    value: function observer() {
      this.auth.onAuthStateChanged(function (user) {
        if (user) {
          // User is signed in.
        } else {
            // No user is signed in.
          }
      });
    }
  }]);

  return Auth;
}();
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Messages = function () {
  function Messages(database, aes) {
    _classCallCheck(this, Messages);

    this.database = database;
    this.aes = aes;
  }

  _createClass(Messages, [{
    key: 'send',
    value: function send(message) {
      return this.database.ref('messages/').push({
        'date': Date(),
        'message': message
      }).key;
    }
  }, {
    key: 'read',
    value: function read(element) {
      var self = this;
      var msgsRef = firebase.database().ref('messages/');
      msgsRef.on('child_added', function (data) {
        self.update(element, data.val());
      });
    }
  }, {
    key: 'update',
    value: function update(element, data) {
      var el = document.getElementById(element);
      el.value += data.date + "\n";
      el.value += data.message + "\n";
      el.scrollTop = el.scrollHeight;
    }
  }]);

  return Messages;
}();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Aes = function () {
  function Aes() {
    _classCallCheck(this, Aes);
  }

  _createClass(Aes, [{
    key: "encrypt",

    /**
     * encrypt a message
     * @param  {string} message    message to encrypt
     * @param  {string} passphrase passphrase to use
     * @return {string}            encrypted message
     */
    value: function encrypt(message, passphrase) {
      return CryptoJS.AES.encrypt(message, passphrase).toString();
    }

    /**
     * decrypt a message
     * @param  {string} message    encrypted message
     * @param  {string} passphrase passphrase used to encrypt the message
     * @return {string}            decrypted message
     */

  }, {
    key: "decrypt",
    value: function decrypt(message, passphrase) {
      return CryptoJS.AES.decrypt(message, passphrase).toString(CryptoJS.enc.Utf8);
    }
  }]);

  return Aes;
}();
'use strict';

// var config = {
//   apiKey: "AIzaSyCPOA2gBL3mU1HktjOPT5wRReKOaGLyOso",
//   authDomain: "jabberwocky-8583d.firebaseapp.com",
//   databaseURL: "https://jabberwocky-8583d.firebaseio.com",
//   projectId: "jabberwocky-8583d",
//   storageBucket: "jabberwocky-8583d.appspot.com",
//   messagingSenderId: "867241314701"
// };
// firebase.initializeApp(config);

var auth = new Auth(firebase.auth());
//let result = auth.createUser('test@example.com', 'password');
//auth.signIn('test@example.com', 'password');
//console.log(result);
var database = firebase.database();
var messages = new Messages(database, new Aes());
//messages.send('hello');

var send = document.getElementById('send');
send.onclick = function () {
	var msgBox = document.getElementById('msg');
	messages.send(msgBox.value);
	msgBox.value = '';
};
messages.read('msgs');