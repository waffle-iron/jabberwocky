const template = new Template;
const user = new User;
const message = new Message;

template 
  .empty('main') 
  .load('login', 'main') 
  .listen('login', user, 'login'); 
template.load('register', 'main');

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    template.empty('main').load('chat', 'main');
    template.listen('chat', message, 'send');
  }
});



let msgsRef = firebase.database().ref('messages/');
msgsRef.on('child_added', function(data) {
  message.update('chat__messages', data.val());
});

/*
var self = this;
    return this.database.ref('messages/').push({
      'date': Date(),
      'user': from,
      'message': self.aes.encrypt(message, from)
    }).key;
 */