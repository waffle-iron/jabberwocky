const template = new Template;
const user = new User;
const message = new Message;
const encryption = new Encryption;
template 
  .empty('main') 
  .load('login', 'main') 
  .listen('login', user, 'login'); 
template.load('register', 'main');
template.load('chat', 'main');
template.listen('chat', message, 'send');

let msgsRef = firebase.database().ref('messages/');
msgsRef.on('child_added', function(data) {
  message.update('chat__messages', data.val());
});
