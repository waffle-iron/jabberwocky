'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Template = function () {
  function Template() {
    _classCallCheck(this, Template);
  }

  _createClass(Template, [{
    key: 'load',

    /**
     * Load an HTML template into the container.
     * @param  {string} template  ID of the template
     * @param  {string} container ID of the container
     * @return void
     */
    value: function load(template, container) {
      var t = document.getElementById(template + '__template');
      var c = document.getElementById(container + '__container');
      var l = document.importNode(t.content, true);
      c.appendChild(l);
      return this;
    }

    /** 
     * Empty a container 
     * @param  {string} container name of the container 
     * @return {Template} 
     */

  }, {
    key: 'empty',
    value: function empty(container) {
      var c = document.getElementById(container + '__container');
      c.innerHTML = '';
      return this;
    }
  }, {
    key: 'observe',
    value: function observe(el, object, callback) {}
  }, {
    key: 'listen',
    value: function listen(el, object, callback) {
      var t = document.getElementById(el + '__button');
      return t.onclick = function () {
        object[callback]();
      };
    }
  }, {
    key: 'enter',
    value: function enter(el, object, callback) {
      var t = document.getElementById(el);
      return t.onkeypress = function (e) {
        if (e.keyCode === 13) {
          object[callback]();
        }
      };
    }
  }]);

  return Template;
}();
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var User = function () {
  function User() {
    _classCallCheck(this, User);
  }

  _createClass(User, [{
    key: 'register',
    value: function register() {
      this.getValues('register');
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password).catch(function (error) {
        return error.message;
      });
    }
  }, {
    key: 'login',
    value: function login() {
      this.getValues('login');
      return firebase.auth().signInWithEmailAndPassword(this.email, this.password).catch(function (error) {
        return errorMessage = error.message;
      });
    }
  }, {
    key: 'logout',
    value: function logout() {
      firebase.auth().signOut().then(function () {
        location.reload(true);
      }).catch(function (error) {
        // An error happened.
      });
    }
  }, {
    key: 'getValues',
    value: function getValues(type) {
      this.email = document.getElementById(type + '_email__input').value;
      this.password = document.getElementById(type + '_password__input').value;
    }
  }]);

  return User;
}();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Encryption = function () {
  function Encryption() {
    _classCallCheck(this, Encryption);
  }

  _createClass(Encryption, null, [{
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

  return Encryption;
}();
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Message = function () {
  function Message() {
    _classCallCheck(this, Message);
  }

  _createClass(Message, [{
    key: 'send',
    value: function send() {
      var msgBox = document.getElementById('chat__message');
      var email = firebase.auth().currentUser.email;

      if (msgBox.value != "") {
        firebase.database().ref('messages/').push({
          'date': Date(),
          'user': email,
          'message': Encryption.encrypt(msgBox.value, email)
        }).key;

        msgBox.value = '';

        return false;
      }
    }
  }, {
    key: 'update',
    value: function update(element, data) {
      var el = document.getElementById(element);

      var msg = document.createElement('div');
      var date = document.createElement('span');
      var user = document.createElement('span');
      var content = document.createElement('span');

      msg.className = 'msg';
      date.className = 'date';
      user.className = 'user';
      content.className = 'content';

      var ts = new Date(data.date);
      var m = ts.getMonth() + 1;
      var d = ts.getDate();
      var y = ts.getFullYear();
      ts = m + '/' + d + '/' + y;

      var textUser = document.createTextNode(data.user);
      var textDate = document.createTextNode(ts);
      var textContent = document.createTextNode(Encryption.decrypt(data.message, data.user));

      date.appendChild(textDate);
      user.appendChild(textUser);
      content.appendChild(textContent);

      msg.appendChild(user);
      msg.appendChild(date);
      msg.appendChild(content);
      el.appendChild(msg);

      el.scrollTop = el.scrollHeight;
    }
  }]);

  return Message;
}();
'use strict';

var template = new Template();
var jwUser = new User();
var message = new Message();

var email = '';

template.empty('main').load('login', 'main').listen('login', jwUser, 'login');
template.load('register', 'main');
template.load('head_out', 'head');

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    template.empty('main').load('chat', 'main');
    template.listen('chat', message, 'send');
    template.enter('chat__message', message, 'send');

    template.empty('head').load('head_in', 'head');
    template.listen('head_in', jwUser, 'logout');

    var msgsRef = firebase.database().ref('messages/').limitToLast(100);
    msgsRef.on('child_added', function (data) {
      message.update('chat__messages', data.val());
    });
  }
});