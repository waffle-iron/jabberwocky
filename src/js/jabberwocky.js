const template = new Template;
const jwUser = new User;
const message = new Message;

let email = '';

template 
  .empty('main') 
  .load('login', 'main') 
  .listen('login', jwUser, 'login'); 
template.load('register', 'main');
template.load('head_out', 'head');

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    template.empty('main').load('chat', 'main');
    template.listen('chat', message, 'send');
    template.empty('head').load('head_in', 'head');
    template.listen('head_in', jwUser, 'logout');

    let msgsRef = firebase.database().ref('messages/').limitToLast(100);
    msgsRef.on('child_added', function(data) {
      message.update('chat__messages', data.val());
    });
    
  }
});
