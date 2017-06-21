const template = new Template;
const user = new User;
const message = new Message;
template 
  .empty('main') 
  .load('login', 'main') 
  .listen('login', user, 'login'); 
template.load('register', 'main');
