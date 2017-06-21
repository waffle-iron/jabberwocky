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
    key: 'listen',
    value: function listen(el, object, callback) {
      var t = document.getElementById(el + '__button');
      t.onclick = function () {
        object[callback]();
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
    }
  }, {
    key: 'login',
    value: function login() {
      this.getValues('login');
    }
  }, {
    key: 'logout',
    value: function logout() {}
  }, {
    key: 'getValues',
    value: function getValues(type) {
      this.email = document.getElementById(type + '_email__input');
      this.password = document.getElementById(type + '_password__input');
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

  _createClass(Encryption, [{
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
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Message = function Message() {
  _classCallCheck(this, Message);
};
'use strict';

var template = new Template();
var user = new User();
var message = new Message();
template.empty('main').load('login', 'main').listen('login', user, 'login');
template.load('register', 'main');