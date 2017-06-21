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
    }

    /**
     * Event listener for clicks.
     * @param  {string}   el       name of template
     * @param  {Function} callback action
     * @return void
     */

  }, {
    key: 'listen',
    value: function listen(el, callback) {
      var t = document.getElementById(el + '__button');
      t.onclick = function () {
        callback();
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
    key: 'login',
    value: function login(email, password) {
      console.log('logging in');
    }
  }]);

  return User;
}();
"use strict";
'use strict';

var template = new Template();
var auth = new User();
template.load('login', 'main');
template.load('register', 'main');
template.listen('login', auth.login);