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
      var self = this;
      return this.database.ref('messages/').push({
        'date': Date(),
        'user': from,
        'message': self.aes.encrypt(message, from)
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

      var msg = document.createElement("div");
      var date = document.createElement("span");
      var user = document.createElement("span");
      var content = document.createElement("span");

      msg.className = "msg";
      date.className = "date";
      user.className = "user";
      content.className = "content";

      var ts = new Date(data.date);
      var m = ts.getMonth() + 1;
      var d = ts.getDate();
      var y = ts.getFullYear();
      ts = m + "/" + d + "/" + y;

      var textUser = document.createTextNode(data.user);
      var textDate = document.createTextNode(ts);
      var textContent = document.createTextNode(this.aes.decrypt(data.message, data.user));

      date.appendChild(textDate);
      user.appendChild(textUser);
      content.appendChild(textContent);

      msg.appendChild(user);
      msg.appendChild(date);
      msg.appendChild(content);
      el.appendChild(msg);

      //el.value += data.date + "\n";
      //el.value += data.user + ': ' + data.message + "\n";
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
    key: 'sendMessage',
    value: function sendMessage() {
      var self = this;
      var msgBox = document.getElementById('msg');
      if (msgBox.value != "") {
        self.messages.send(msgBox.value, self.email);
        msgBox.value = '';
        return false;
      }
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
      send.onclick = this.sendMessage;

      msg.onkeypress = function () {
        if (e.keyCode == 13) {
          self.sendMessage();
        }
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