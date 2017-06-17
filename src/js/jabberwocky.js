class Jabberwocky {
  constructor(auth, messages) {
    this.showLogin();
    this.auth = auth;
    this.messages = messages;
    this.email = '';
    this.observer();
  }
  showLogin() {
    let login = document.getElementById('login');
    let main = document.getElementById('main');
    main.innerHTML = '';
    let clone = document.importNode(login.content, true);
    main.appendChild(clone);
    let loginBtn = document.getElementById('login__btn');
    loginBtn.onclick = function() {
      let username = document.getElementById('username');
      let password = document.getElementById('password');
      let result = auth.signIn(username.value, password.value);
      return false;
    };
  }
  showChat() {
    var self = this;
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
      self.messages.send(msgBox.value, self.email);
      msgBox.value = '';
      return false;
    };
    let logout = document.getElementById('logout');
    logout.onclick = function() {
      self.auth.signOut();
      self.showLogin();
      return false;
    };
    this.messages.read('msgs');
  }
  observer() {
    var self = this;
    this.auth.onAuthStateChanged(function(user) {
      if (user) {
        self.email = user.email;
        self.showChat();
      }
    });
  }
}
let fbAuth = firebase.auth();
let database = firebase.database();

let messages = new Messages(database, new Aes);
let auth = new Auth(fbAuth);

let jw = new Jabberwocky(fbAuth, messages);
