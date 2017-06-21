let template = new Template;
let auth = new User;
template.load('login', 'main');
template.load('register', 'main');
template.listen('login', auth.login);
