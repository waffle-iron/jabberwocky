class Jabberwocky {
    constructor(auth, messages, profile) {
        this.showLogin();
        this.showRegister();
        this.auth = auth;
        this.messages = messages;
        this.email = '';
        this.profile = profile;
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
    showRegister() {
        let register = document.getElementById('register');
        let main = document.getElementById('main');
        let clone = document.importNode(register.content, true);
        main.appendChild(clone);

        let registerBtn = document.getElementById('register__btn');
        registerBtn.onclick = function() {
          let username = document.getElementById('register__username');
          let password = document.getElementById('register__password');
          let confirmPassword = document.getElementById('reigster__confirm_password');
          if(password.value !== confirmPassword.value) {
            console.error('passwords do not match');
            return;
          }
          let result = auth.createUser(username.value, password.value);
          return false;
        };
      }
    sendMessage() {
      var self = this;
      let msgBox = document.getElementById('msg');
      if(msgBox.value != ""){
        console.log(self.nickname);
        self.messages.send(msgBox.value, self.profile.nickname);
        msgBox.value = '';
        return false
      }
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
          self.sendMessage();
        };

        msg.onkeypress = function(e){
          if(e.keyCode == 13){
            self.sendMessage();
          }
        }

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
          self.nickname = self.profile.load();
        }
      });
    }
}
let fbAuth = firebase.auth();
let database = firebase.database();

let messages = new Messages(database, new Aes);
let auth = new Auth(fbAuth);

let profile = new Profile(database);

let jw = new Jabberwocky(fbAuth, messages, profile);
