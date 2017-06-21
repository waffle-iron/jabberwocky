let template = new Template;
let auth = new User;
template.load('login', 'main');
template.listen('login', auth.login);
template.load('register', 'main');

