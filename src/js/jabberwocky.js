const template = new Template;
const user = new User;
const message = new Message;
template.load('login', 'main');
template.listen('login', user.login);
template.load('register', 'main');

