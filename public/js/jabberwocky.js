"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Auth = function () {
  function Auth(auth, showLogin, showChat) {
    _classCallCheck(this, Auth);

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
      return this.auth.signInWithEmailAndPassword(email, password).catch(function (error) {
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
        this.showLogin();
      }).catch(function (error) {
        // An error happened.
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
    value: function send(message, from) {
      return this.database.ref('messages/').push({
        'date': Date(),
        'user': from,
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
      el.value += data.user + ': ' + data.message + "\n";
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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Jabberwocky = function () {
  function Jabberwocky(auth, messages) {
    _classCallCheck(this, Jabberwocky);

    this.showLogin();
    this.showRegister();
    this.auth = auth;
    this.messages = messages;
    this.email = '';
    this.observer();
  }

  _createClass(Jabberwocky, [{
    key: 'showLogin',
    value: function showLogin() {
      var login = document.getElementById('login');
      var main = document.getElementById('main');
      main.innerHTML = '';
      var clone = document.importNode(login.content, true);
      main.appendChild(clone);
      var loginBtn = document.getElementById('login__btn');
      loginBtn.onclick = function () {
        var username = document.getElementById('username');
        var password = document.getElementById('password');
        var result = auth.signIn(username.value, password.value);
        return false;
      };
    }
  }, {
    key: 'showRegister',
    value: function showRegister() {
      var register = document.getElementById('register');
      var main = document.getElementById('main');
      var clone = document.importNode(register.content, true);
      main.appendChild(clone);

      var registerBtn = document.getElementById('register__btn');
      registerBtn.onclick = function () {
        var username = document.getElementById('register__username');
        var password = document.getElementById('register__password');
        var confirmPassword = document.getElementById('reigster__confirm_password');
        if (password.value !== confirmPassword.value) {
          console.error('passwords do not match');
          return;
        }
        var result = auth.createUser(username.value, password.value);
        return false;
      };
    }
  }, {
    key: 'showChat',
    value: function showChat() {
      var self = this;
      // hide login
      var login = document.getElementById('login');
      login.style.display = 'none';
      // show chat
      var chat = document.getElementById('chat');
      var main = document.getElementById('main');
      main.innerHTML = '';
      var clone = document.importNode(chat.content, true);
      main.appendChild(clone);
      var send = document.getElementById('send');
      send.onclick = function () {
        var msgBox = document.getElementById('msg');
        self.messages.send(msgBox.value, self.email);
        msgBox.value = '';
        return false;
      };
      var logout = document.getElementById('logout');
      logout.onclick = function () {
        self.auth.signOut();
        self.showLogin();
        return false;
      };
      this.messages.read('msgs');
    }
  }, {
    key: 'observer',
    value: function observer() {
      var self = this;
      this.auth.onAuthStateChanged(function (user) {
        if (user) {
          self.email = user.email;
          self.showChat();
        }
      });
    }
  }]);

  return Jabberwocky;
}();

var fbAuth = firebase.auth();
var database = firebase.database();

var messages = new Messages(database, new Aes());
var auth = new Auth(fbAuth);

var jw = new Jabberwocky(fbAuth, messages);